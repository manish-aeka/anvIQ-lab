BRANCH_NAME=$(git branch --show-current)

echo "*********** Deploying branch $BRANCH_NAME to Firebase hosting... ***********"


firebase deploy --only hosting