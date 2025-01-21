#!/bin/bash
find backend -type f -name "*.py" -exec sed -i '' 's/from backend\.app/from app/g' {} +
find backend -type f -name "*.py" -exec sed -i '' 's/import backend\.app/import app/g' {} + 