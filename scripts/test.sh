npx yarn lint:fix || exit 1
npx yarn prettier:fix || exit 1
npx yarn build || exit 1
npx yarn test || exit 1
npx yarn e2e:all || exit 1