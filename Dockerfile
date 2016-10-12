FROM nginx:latest

#create app folder
RUN mkdir -p /srv/www/sleepdiary.io/

#add user https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04
#RUN useradd -ms /bin/bash sleepdiary && \
#    usermod -aG sudo sleepdiary

# WIP add certificate and https access
# https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04

#copy dist app
COPY src/index.html /srv/www/sleepdiary.io
COPY dist /srv/www/sleepdiary.io

#nginx custom configuration
COPY nginx/sleepdiary.io.conf /etc/nginx/conf.d/sleepdiary.io.conf

# Define working directory.
WORKDIR /etc/nginx

# Expose ports.
EXPOSE 80
EXPOSE 443

