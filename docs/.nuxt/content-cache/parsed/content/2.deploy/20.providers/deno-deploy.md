{"parsed":{"_path":"/deploy/providers/deno-deploy","_dir":"providers","_draft":false,"_partial":false,"_locale":"","title":"Deno Deploy","description":"Deploy Nitro apps to Deno Deploy.","body":{"type":"root","children":[{"type":"element","tag":"h1","props":{"id":"deno-deploy"},"children":[{"type":"text","value":"Deno Deploy"}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Deploy Nitro apps to "},{"type":"element","tag":"a","props":{"href":"https://deno.com/deploy","rel":["nofollow"]},"children":[{"type":"text","value":"Deno Deploy"}]},{"type":"text","value":"."}]},{"type":"element","tag":"p","props":{},"children":[{"type":"element","tag":"strong","props":{},"children":[{"type":"text","value":"Preset:"}]},{"type":"text","value":" "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"deno_deploy"}]},{"type":"text","value":" ("},{"type":"element","tag":"a","props":{"href":"/deploy/#changing-the-deployment-preset"},"children":[{"type":"text","value":"switch to this preset"}]},{"type":"text","value":")"}]},{"type":"element","tag":"alert","props":{"type":"warning"},"children":[{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Deno deploy preset is experimental."}]}]},{"type":"element","tag":"h2","props":{"id":"deploy-with-the-cli"},"children":[{"type":"text","value":"Deploy with the CLI"}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"You can use "},{"type":"element","tag":"a","props":{"href":"https://deno.com/deploy/docs/deployctl","rel":["nofollow"]},"children":[{"type":"text","value":"deployctl"}]},{"type":"text","value":" to deploy your app."}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Login to "},{"type":"element","tag":"a","props":{"href":"https://dash.deno.com/account#access-tokens","rel":["nofollow"]},"children":[{"type":"text","value":"Deno Deploy"}]},{"type":"text","value":" to obtain a "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"DENO_DEPLOY_TOKEN"}]},{"type":"text","value":" access token, and set it as an environment variable."}]},{"type":"element","tag":"pre","props":{"className":"language-bash shiki shiki-themes github-dark github-light","code":"# Build with the deno_deploy NITRO preset\nNITRO_PRESET=deno_deploy npm run build\n\n# Make sure to run the deployctl command from the output directory\ncd .output\ndeployctl deploy --project=my-project server/index.ts\n","language":"bash","meta":"","style":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"element","tag":"span","props":{"class":"line","line":1},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#6A737D;--shiki-default:#6A737D"},"children":[{"type":"text","value":"# Build with the deno_deploy NITRO preset\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":2},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":"NITRO_PRESET"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#F97583;--shiki-default:#D73A49"},"children":[{"type":"text","value":"="}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"deno_deploy"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#B392F0;--shiki-default:#6F42C1"},"children":[{"type":"text","value":" npm"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":" run"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":" build\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":3},"children":[{"type":"element","tag":"span","props":{"emptyLinePlaceholder":true},"children":[{"type":"text","value":"\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":4},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#6A737D;--shiki-default:#6A737D"},"children":[{"type":"text","value":"# Make sure to run the deployctl command from the output directory\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":5},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#79B8FF;--shiki-default:#005CC5"},"children":[{"type":"text","value":"cd"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":" .output\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":6},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#B392F0;--shiki-default:#6F42C1"},"children":[{"type":"text","value":"deployctl"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":" deploy"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#79B8FF;--shiki-default:#005CC5"},"children":[{"type":"text","value":" --project=my-project"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":" server/index.ts\n"}]}]}]}]},{"type":"element","tag":"h2","props":{"id":"deploy-within-cicd-using-github-actions"},"children":[{"type":"text","value":"Deploy within CI/CD using GitHub Actions"}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"You just need to include the deployctl GitHub Action as a step in your workflow."}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"You do not need to set up any secrets for this to work. You do need to link your GitHub repository to your Deno Deploy project and choose the \"GitHub Actions\" deployment mode. You can do this in your project settings on "},{"type":"element","tag":"a","props":{"href":"https://dash.deno.com","rel":["nofollow"]},"children":[{"type":"text","value":"https://dash.deno.com"}]},{"type":"text","value":"."}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Create "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":".github/workflows/deno_deploy.yml"}]},{"type":"text","value":":"}]},{"type":"element","tag":"pre","props":{"className":"language-yaml shiki shiki-themes github-dark github-light","code":"name: deno-deploy\n\non:\n  push:\n    branches:\n      - main\n  pull_request:\n    branches:\n      - main\n\njobs:\n  deploy:\n    steps:\n      - uses: actions/checkout@v3\n      - run: corepack enable\n      - uses: actions/setup-node@v3\n        with:\n          node-version: 18\n          cache: pnpm\n      - run: pnpm install\n      - run: pnpm build\n        env:\n          NITRO_PRESET: deno_deploy\n      - name: Deploy to Deno Deploy\n        uses: denoland/deployctl@v1\n        with:\n          project: my-project\n          entrypoint: server/index.ts\n          root: .output\n","language":"yaml","meta":"","style":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"element","tag":"span","props":{"class":"line","line":1},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"name"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"deno-deploy\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":2},"children":[{"type":"element","tag":"span","props":{"emptyLinePlaceholder":true},"children":[{"type":"text","value":"\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":3},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#79B8FF;--shiki-default:#005CC5"},"children":[{"type":"text","value":"on"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":":\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":4},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"  push"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":":\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":5},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"    branches"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":":\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":6},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":"      - "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"main\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":7},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"  pull_request"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":":\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":8},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"    branches"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":":\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":9},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":"      - "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"main\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":10},"children":[{"type":"element","tag":"span","props":{"emptyLinePlaceholder":true},"children":[{"type":"text","value":"\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":11},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"jobs"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":":\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":12},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"  deploy"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":":\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":13},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"    steps"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":":\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":14},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":"      - "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"uses"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"actions/checkout@v3\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":15},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":"      - "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"run"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"corepack enable\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":16},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":"      - "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"uses"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"actions/setup-node@v3\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":17},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"        with"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":":\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":18},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"          node-version"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#79B8FF;--shiki-default:#005CC5"},"children":[{"type":"text","value":"18\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":19},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"          cache"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"pnpm\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":20},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":"      - "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"run"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"pnpm install\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":21},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":"      - "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"run"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"pnpm build\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":22},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"        env"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":":\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":23},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"          NITRO_PRESET"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"deno_deploy\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":24},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":"      - "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"name"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"Deploy to Deno Deploy\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":25},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"        uses"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"denoland/deployctl@v1\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":26},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"        with"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":":\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":27},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"          project"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"my-project\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":28},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"          entrypoint"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":"server/index.ts\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":29},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-dark:#85E89D;--shiki-default:#22863A"},"children":[{"type":"text","value":"          root"}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#E1E4E8;--shiki-default:#24292E"},"children":[{"type":"text","value":": "}]},{"type":"element","tag":"span","props":{"style":"--shiki-dark:#9ECBFF;--shiki-default:#032F62"},"children":[{"type":"text","value":".output\n"}]}]}]}]},{"type":"element","tag":"style","props":{},"children":[{"type":"text","value":"html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html.dark .shiki span {color: var(--shiki-dark);background: var(--shiki-dark-bg);font-style: var(--shiki-dark-font-style);font-weight: var(--shiki-dark-font-weight);text-decoration: var(--shiki-dark-text-decoration);}html .dark .shiki span {color: var(--shiki-dark);background: var(--shiki-dark-bg);font-style: var(--shiki-dark-font-style);font-weight: var(--shiki-dark-font-weight);text-decoration: var(--shiki-dark-text-decoration);}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}"}]}],"toc":{"title":"","searchDepth":2,"depth":2,"links":[{"id":"deploy-with-the-cli","depth":2,"text":"Deploy with the CLI"},{"id":"deploy-within-cicd-using-github-actions","depth":2,"text":"Deploy within CI/CD using GitHub Actions"}]}},"_type":"markdown","_id":"content:2.deploy:20.providers:deno-deploy.md","_source":"content","_file":"2.deploy/20.providers/deno-deploy.md","_extension":"md"},"hash":"AbViTVNa5x"}