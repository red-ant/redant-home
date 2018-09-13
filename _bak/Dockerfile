# Look into using Alpine. Issue at the moment is installing ffi
# RUN apk --update add build-base libffi-dev

FROM starefossen/ruby-node:latest
MAINTAINER Jason Taylor <jason@redant.com.au>

ENV APP_PATH /app
ENV BUNDLE_GEMFILE=$APP_PATH/Gemfile \
    BUNDLE_JOBS=2 \
    BUNDLE_PATH=/bundle

RUN mkdir $APP_PATH
WORKDIR $APP_PATH

ADD Gemfile* $APP_PATH/
RUN bundle install

ADD package.json yarn.lock $APP_PATH/
RUN yarn install

ADD . $APP_PATH
