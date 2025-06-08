install:
	yarn install

dev:
	yarn dev

build:
	yarn build

preview:
	yarn preview

lint:
	yarn lint

clean:
	rm -rf dist

# Instalação das dependências necessárias e padronização
setup:
	rm -f package-lock.json
	yarn install
	yarn add react@18 react-dom@18
	yarn add -D @types/react@18 @types/react-dom@18 @types/jest lucide-react
	mv -f src/config/lazyLoad.ts src/config/lazyLoad.tsx || true 