#!/bin/bash

if command -v gnome-terminal &> /dev/null; then
    gnome-terminal --working-directory="$(pwd)/Frontend" -- bash -c "pnpm run dev; exec bash"
elif command -v konsole &> /dev/null; then
    konsole --workdir "$(pwd)/Frontend" -e bash -c "pnpm run dev; exec bash" &
elif command -v xterm &> /dev/null; then
    xterm -e "cd Frontend && pnpm run dev; exec bash" &
else
    echo "Nenhum terminal suportado encontrado."
fi

if command -v gnome-terminal &> /dev/null; then
    gnome-terminal --working-directory="$(pwd)/Backend" -- bash -c "pnpm run dev; exec bash"
elif command -v konsole &> /dev/null; then
    konsole --workdir "$(pwd)/Backend" -e bash -c "pnpm run dev; exec bash" &
elif command -v xterm &> /dev/null; then
    xterm -e "cd Backend && pnpm run dev; exec bash" &
fi