npx yarn lint:fix || exit 1
npx yarn prettier:fix || exit 1
npx yarn build || exit 1
npx yarn test || exit 1
npx yarn e2e:headless || exit 1

git add .
git commit
git push