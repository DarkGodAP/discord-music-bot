import { Octokit } from '@octokit/rest';

let connectionSettings;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function setupGitHubRepo() {
  try {
    const octokit = await getGitHubClient();
    
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`✅ Authenticated as: ${user.login}`);
    
    const repoName = 'discord-music-bot';
    
    let repo;
    try {
      const { data } = await octokit.repos.get({
        owner: user.login,
        repo: repoName
      });
      repo = data;
      console.log(`✅ Repository '${repoName}' already exists`);
    } catch (error) {
      if (error.status === 404) {
        const { data } = await octokit.repos.createForAuthenticatedUser({
          name: repoName,
          description: 'A Discord music bot with Spotify and YouTube integration',
          private: false,
          auto_init: false
        });
        repo = data;
        console.log(`✅ Created new repository: ${repo.html_url}`);
      } else {
        throw error;
      }
    }
    
    console.log(`\n📦 Repository URL: ${repo.html_url}`);
    console.log(`🔗 Clone URL: ${repo.clone_url}`);
    
    return repo;
  } catch (error) {
    console.error('❌ Error setting up GitHub repository:', error.message);
    process.exit(1);
  }
}

setupGitHubRepo();
