FROM ruby:3.0.4

RUN apt-get update -qq && apt-get install -y build-essential nodejs npm libpq-dev postgresql-client

RUN npm install -g yarn

RUN mkdir /usr/src/rails-api

WORKDIR /usr/src/rails-api

ADD . /usr/src/rails-api

RUN gem install bundler -v 2.4.10

RUN bundle install

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]