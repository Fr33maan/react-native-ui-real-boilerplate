# Goals

Provide a free solution, efficient and practicable for business production apps.  
Provide meaningful crash reports.  
Integrate the lib in the FML stack as a plugin.

# FML Stack

Because when you start to think about this kind of stuff, you could say "F My Life"  
But here, it stands for Feature Flaging, Metrics and Logs.

# The L part - Logs

We want to have a cheap solution for startups while still having full control on what is happening in our business.

## Competitors

- Datadog is for company with funds as it can quickly cost you thousands of USD every year.
- Log rocket with 1000 session per month for the free tier is clearly for dev, then when you go prod, it's expensive.
- Sentry is one of the best solution, they have an OSS you can run on premises, but it lacks context and logs support.
- ELK, expensive because the ressources it needs to run and high time cost of setup.
-

## The issue

As a solo tech founder, I have much more knowledge into Computer Science than business. I lack information about how to properly run affairs.  
I also spend more time on new features than monitoring the business. There is too much tools to choose in and my time is precious.

So we ship a 'one soft for all problems' solution. This soft is called Grafana.  
Grafana labs have made significant steps forward to compete with ELK and they can solve many problems.

## Solution - Server

While Loki is less usable than bigger competitors like ELK and Datadog, the customisation Grafana offers for dashboard makes it a viable solution.  
Additionaly, they are constantly improving their software and we believe in their capacity to make Grafana + Loki as nice to use than biggest competitors.
Because of Grafana dashboards, you can display meaningful information for a single error like full sourcemaped error stacktrace, corresponding logs and user configuration on the same view.

## Solution - Client

A smart log agent which logs into the console when you are developing and store the last X logs in memory to send them with the error it just catched.
warning, error and fatal are sent to the server with stacktrace and additional metas you can setup.

## API

### Silly

log the everything which could be used for metrics, not intended to be used for debug or to be viewed by humans.  
There is usually a high volume of this kind of logs, it can be http requests/responses or any kind of information.

### Debug

The actions calls, parameters, the results on functions. Everything which can be usefull for debug for too much for simply monitoring what the app does.

### Info

Simplified information about the inner app state

### Warning / warn

A deprecation or anything which should trigger an action from the dev team.

### Error / err

Something went wrong but the app is still running safely.

### Fatal

The app crashed, either from the native or the JS thread.

# Metrics

We have choosen Grafana for logs because it's the perfect solution for metrics too.  
If you combine Grafana with InfluxDB, you can build nice visualisation of your metrics. A key factor in fund raising success.  
Control your business and your tech from the same tool.

# Monitoring

Grafana is a tool made for monitoring.

# Feature flaging

We have to use another tools for this one and it's Flagr.
**Integrate an iframe into Grafana ?**
