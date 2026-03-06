{pkgs}: {
  channel = "stable-24.05";
  packages = [
    # pkgs.nodejs_20
    pkgs.nodejs_latest
    pkgs.yarn-berry
    pkgs.corepack_latest
    pkgs.devbox
    pkgs.neofetch
    pkgs.htop
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