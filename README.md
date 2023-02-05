## Development environment

### Warning

This repo uses `vscode`, `WSL`/`linux` and `devcontainers` as an integral part of its developement environment. It is highly disadvised to deviate from this setup. Do so at your own risk! ⚠️

### Requirements

To get started you will need the following software:

- `Docker`. E.g. [`Docker Desktop`][docker]
- [`VSCode`][vscode] and the following extension-pack:
  - [`Remote Development`][remote]. This is used to connect to the running `docker`-image.
- **IF** developing on a `Windows`-installation:
  - [`WSL`][wsl] to open the repo in and develop from. It also improves `docker` build performance.

### Setup

1. Clone the repo inside your UNIX-based filesystem (`WSL`/`MacOS`/`Linux`).
2. Open the repo using `code .`. A `vscode`-window should now appear. If not open `vscode` manually and find the repo.
3. Copy the `.env` file into the `IBDB` folder.
4. With the [`Remote Development`][remote]-extension-pack installed:
   - Open the `Command Palette` (shortcut: `ctrl + shift + p` / `cmd + shift + p`) inside `vscode`.
   - Type and select `Remote-Containers: Reopen in container`.
   - Your `devcontainer` should now start initializing. This will take a while.
5. To run the app in development mode type `npm run dev` in the terminal. Your app will become available at [`localhost`][localhost] after some waiting.

[docker]: https://www.docker.com/products/docker-desktop/
[vscode]: https://code.visualstudio.com/
[remote]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack
[wsl]: https://docs.microsoft.com/en-us/windows/wsl/install
[localhost]: http://localhost:5173