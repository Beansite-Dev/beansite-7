{pkgs}: {
  channel = "stable-24.05";
  packages = [
    # pkgs.nodejs_20
    pkgs.nodejs_latest
    pkgs.yarn-berry
    pkgs.corepack_latest
    # pkgs.nodePackages
  ];
  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];
  idx.previews = {
    previews = {
      # web = {
      #   command=[
      #     "yarn"
      #     "&&"
      #     "yarn"
      #     "dev"
      #     "--host"
      #     "--port"
      #     "$PORT"
      #     "0.0.0.0"
      #   ];
      #   # command = [
      #   #   "npm"
      #   #   "run"
      #   #   "dev"
      #   #   "--"
      #   #   "--port"
      #   #   "$PORT"
      #   #   "--host"
      #   #   "0.0.0.0"
      #   # ];
      #   manager = "web";
      # };
    };
  };
}