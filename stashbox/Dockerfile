# Stashbox Dockerfile
FROM synchro/stashbox:1.1.1

# Update the "stash"
RUN rm -rfr /usr/src/app/stash/*
COPY stash /usr/src/app/stash

EXPOSE 80 

CMD [ "node", "app.js" ]