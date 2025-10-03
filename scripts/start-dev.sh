#!/bin/bash

nx build api-gateway
nx build admin_service
nx build auth_service
nx build db_service 
nx build flight_service
nx build loyalty_program_service
nx build news_service
nx build reviews_service
nx build ticket_service
nx build users_service

concurrently \
  "node dist/apps/api-gateway/main.js" \
  "node dist/apps/admin_service/main.js" \
  "node dist/apps/auth_service/main.js" \
  "node dist/apps/db_service/main.js" \
  "node dist/apps/flight_service/main.js" \
  "node dist/apps/loyalty_program_service/main.js" \
  "node dist/apps/news_service/main.js" \
  "node dist/apps/reviews_service/main.js" \
  "node dist/apps/ticket_service/main.js" \
  "node dist/apps/users_service/main.js" 
