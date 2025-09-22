cls
echo Deploying to Firebase
yarn firebase deploy
echo Deploying to Vercel
yarn vercel --prod
echo Finished!