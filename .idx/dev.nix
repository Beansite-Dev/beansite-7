{pkgs}: {
  channel = "stable-25.05";
  packages = [
    # pkgs.nodejs_20
    pkgs.nodejs_latest
    pkgs.corepack_latest
    pkgs.pnpm
    # pkgs.nodePackages
  ];
  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
    "aaron-bond.better-comments"
    "GitHub.github-vscode-theme"
    "JeronimoEkerdt.color-picker-universal"
    "solomonkinard.spell-check"
    "Tomi.xajssnippets"
    "ycodetech.automatic-comment-blocks"
  ];
  idx.previews = {
    previews = {
      web = {
        command=[
          "yarn"
          "dev"
          "--port"
          "$PORT"
        ];
        # command = [
        #   "npm"
        #   "run"
        #   "dev"
        #   "--"
        #   "--port"
        #   "$PORT"
        #   "--host"
        #   "0.0.0.0"
        # ];
        manager = "web";
      };
    };
  };
}