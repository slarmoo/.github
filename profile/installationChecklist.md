- Setup trackpad
- Use `F keys` as standard function keys
- [Warp Console](https://app.warp.dev/get_warp)
- [Visual Studio Code](https://code.visualstudio.com/download)
- XCode Command Line Developer Tools. This was initiated by typing `git` from the default terminal. This caused git to be installed.
- Created `.zshrc` Add alias and disable printing % at the end of commands that don't output a newline.

  ```sh
  alias c=code
  alias ll='ls -lh'
  alias idea='open -na "IntelliJ IDEA CE.app" --args '
  alias c=code
  alias obs='open -n -a OBS.app'

  set +o prompt_cr +o prompt_sp
  ```

- Configured git
  ```sh
  git config --global user.email "your email"
  git config --global user.name "your user name"
  git config --global alias.s status
  git config --global alias.l log --all --graph --decorate --oneline --pretty=format:'%C(bold red)%d%Creset %cr %C(bold yellow)%h%Creset - %C(green)%an%Creset %s' -20
  git config --global pull.rebase true
  git config --global core.editor code
  git config --global core.pager cat
  git config --global core.autocrlf input
  git config --global init.defaultbranch main
  ```
  On commit git asked me for credentials. Supplied gitHub user name and personal access token (PAS). To get PAS click on User Profile Pic/Settings/Developer settings/Personal access tokens
- Cloned course documentation repository
  ```sh
  cd ~/byu/source
  git clone https://github.com/webprogramming260/.github.git webprogramming260
  ```
- Installed VS Code extensions
  - Live Server
  - Prettier
  - ESLint
  - Code Spell Checker
  - GitLens
- Set VSCode prettier line length to 120 from default 80
- Installed NVM, Node, NPM by installing NVM first and then the LTS version of Node. This was v18.13.

  ```sh
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

  . ~/.nvm/nvm.sh

  nvm install --lts
  ```

- Install flycut from the App Store
- Created keyboard shortcuts for moving windows
  1. Open System Preferences > Keyboard > Shortcuts
  1. Select "App Shortcuts"
  1. Press the "+" button to create a new shortcut.
  1. You'll need to make two of these, one for left and one for right.
  1. For Application select "All Applications"
  1. For Menu Title, you'll need the exact wording used in the menu.
     - Move Window to Left Side of Screen
     - Move Window to Right Side of Screen
- Disable system setting to have `F11` show command control
- Disable system setting mapping `F` keys to device actions
- Installed Homebrew
- Used `brew install ffmpeg`
- Changed VS Code setting to format on file save.
- Added git aliases and pull default
  ```sh
  git config --global alias.s status
  git config --global alias.l "log --all --graph --decorate --oneline --pretty=format:'%C(bold red)%d%Creset %cr %C(bold yellow)%h%Creset - %C(green)%an%Creset %s' -20"
  git config pull.rebase true
  git config --global core.pager cat
  ```
