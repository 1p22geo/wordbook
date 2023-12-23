npx yarn lint:fix || exit 1
npx yarn prettier:fix || exit 1

git add .
git commit
git push