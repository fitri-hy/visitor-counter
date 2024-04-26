# API Visitor Counter Node JS

## Get Started

Installing
```
git clone https://github.com/fitri-hy/visitor-counter.git
cd visitor-counter
npm i hy-visitor-counter
node index.js
```

##Get Started

#### Import Modules
```
const visitorCounter = require('hy-visitor-counter');
```

#### Create Middleware to Process Request
```
app.use((req, res, next) => {
    visitorCounter.incrementVisitor(req);
    next();
});
```

#### Create Middleware Total Visitors
```
app.use((req, res, next) => {
    res.locals.totalVisitors = visitorCounter.getVisitorCount();
    next();
});
```

#### Endpoint Visitors
```
app.get('/api/visitors', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const visitors = visitorCounter.getVisitors().slice(startIndex, endIndex);

    res.json({
        totalVisitors: res.locals.totalVisitors,
        page: page,
        limit: limit,
        totalPages: Math.ceil(res.locals.totalVisitors / limit),
        visitors: visitors
    });
});
```

#### Endpoint Daily Visitors
```
app.get('/api/stats/daily', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const dailyVisits = visitorCounter.getDailyVisits();
    const slicedData = Object.entries(dailyVisits).slice(startIndex, endIndex);
    const slicedDailyVisits = Object.fromEntries(slicedData);

    res.json({
        totalVisitors: res.locals.totalVisitors,
        page: page,
        limit: limit,
        totalPages: Math.ceil(Object.keys(dailyVisits).length / limit),
        dailyVisits: slicedDailyVisits
    });
});
```

#### Endpoint Weekly Visitors
```
app.get('/api/stats/weekly', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const weeklyVisits = visitorCounter.getWeeklyVisits();
    const slicedData = Object.entries(weeklyVisits).slice(startIndex, endIndex);
    const slicedWeeklyVisits = Object.fromEntries(slicedData);

    res.json({
        totalVisitors: res.locals.totalVisitors,
        page: page,
        limit: limit,
        totalPages: Math.ceil(Object.keys(weeklyVisits).length / limit),
        weeklyVisits: slicedWeeklyVisits
    });
});
```

#### Endpoint Monthly Visitors
```
app.get('/api/stats/monthly', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const monthlyVisits = visitorCounter.getMonthlyVisits();
    const slicedData = Object.entries(monthlyVisits).slice(startIndex, endIndex);
    const slicedMonthlyVisits = Object.fromEntries(slicedData);

    res.json({
        totalVisitors: res.locals.totalVisitors,
        page: page,
        limit: limit,
        totalPages: Math.ceil(Object.keys(monthlyVisits).length / limit),
        monthlyVisits: slicedMonthlyVisits
    });
});
```

#### Endpoint Annually Visitors
```
app.get('/api/stats/yearly', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const yearlyVisits = visitorCounter.getYearlyVisits();
    const slicedData = Object.entries(yearlyVisits).slice(startIndex, endIndex);
    const slicedYearlyVisits = Object.fromEntries(slicedData);

    res.json({
        totalVisitors: res.locals.totalVisitors,
        page: page,
        limit: limit,
        totalPages: Math.ceil(Object.keys(yearlyVisits).length / limit),
        yearlyVisits: slicedYearlyVisits
    });
});
```

## Use Curl Example

#### Without Pagination
- Endpoint to get visitor information without pagination<br>
`curl "http://localhost:3000/api/visitors"`
- Endpoint to get daily visit statistics without pagination<br>
`curl "http://localhost:3000/api/stats/daily"`
- Endpoint to get weekly visit statistics without pagination<br>
`curl "http://localhost:3000/api/stats/weekly"`
- Endpoint to get monthly visit statistics without pagination<br>
`curl "http://localhost:3000/api/stats/monthly"`
- Endpoint to get annual visit statistics without pagination<br>
`curl "http://localhost:3000/api/stats/yearly"`

#### With Pagination
- Endpoint to get visitor information with pagination<br>
`curl "http://localhost:3000/api/visitors?page=1&limit=10"`
- Endpoint to get visitor information with pagination<br>
`curl "http://localhost:3000/api/visitors?page=1&limit=10"`
- Endpoint to get daily visit statistics with pagination<br>
`curl "http://localhost:3000/api/stats/daily?page=1&limit=10"`
- Endpoint to get weekly visit statistics with pagination<br>
`curl "http://localhost:3000/api/stats/weekly?page=1&limit=10"`
- Endpoint to get monthly visit statistics with pagination<br>
`curl "http://localhost:3000/api/stats/monthly?page=1&limit=10"`
- Endpoint to get annual visit statistics with pagination<br>
`curl "http://localhost:3000/api/stats/yearly?page=1&limit=10"`

#### With Filtering
- Endpoint to get daily visit statistics with pagination & filtering<br>
`curl "http://localhost:3000/api/stats/daily?year=2024&month=4&day=25"`
- Endpoint to get weekly visit statistics with pagination & filtering<br>
`curl "http://localhost:3000/api/stats/weekly?year=2024&week=17"`
- Endpoint to get monthly visit statistics with pagination & filtering<br>
`curl "http://localhost:3000/api/stats/monthly?year=2024&month=4"`
- Endpoint to get annual visit statistics with pagination & filtering<br>
`curl "http://localhost:3000/api/stats/yearly?&year=2024"`

#### With Pagination & Filtering
- Endpoint to get daily visit statistics with pagination & filtering<br>
`curl "http://localhost:3000/api/stats/daily?page=1&limit=10&year=2024&month=4&day=25"`
- Endpoint to get weekly visit statistics with pagination & filtering<br>
`curl "http://localhost:3000/api/stats/weekly?page=1&limit=10&year=2024&week=17"`
- Endpoint to get monthly visit statistics with pagination & filtering<br>
`curl "http://localhost:3000/api/stats/monthly?page=1&limit=10&year=2024&month=4"`
- Endpoint to get annual visit statistics with pagination & filtering<br>
`curl "http://localhost:3000/api/stats/yearly?page=1&limit=10&year=2024"`

## Full Code Example
```
const express = require('express');
const visitorCounter = require('hy-visitor-counter');

const app = express();
const port = 3000;

app.use((req, res, next) => {
    visitorCounter.incrementVisitor(req);
    next();
});

app.use((req, res, next) => {
    res.locals.totalVisitors = visitorCounter.getVisitorCount();
    next();
});

app.get('/api/visitors', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const visitors = visitorCounter.getVisitors().slice(startIndex, endIndex);
    res.json({
        totalVisitors: res.locals.totalVisitors,
        page: page,
        limit: limit,
        totalPages: Math.ceil(res.locals.totalVisitors / limit),
        visitors: visitors
    });
});

app.get('/api/stats/daily', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const dailyVisits = visitorCounter.getDailyVisits();
    const slicedData = Object.entries(dailyVisits).slice(startIndex, endIndex);
    const slicedDailyVisits = Object.fromEntries(slicedData);
    res.json({
        totalVisitors: res.locals.totalVisitors,
        page: page,
        limit: limit,
        totalPages: Math.ceil(Object.keys(dailyVisits).length / limit),
        dailyVisits: slicedDailyVisits
    });
});

app.get('/api/stats/weekly', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const weeklyVisits = visitorCounter.getWeeklyVisits();
    const slicedData = Object.entries(weeklyVisits).slice(startIndex, endIndex);
    const slicedWeeklyVisits = Object.fromEntries(slicedData);
    res.json({
        totalVisitors: res.locals.totalVisitors,
        page: page,
        limit: limit,
        totalPages: Math.ceil(Object.keys(weeklyVisits).length / limit),
        weeklyVisits: slicedWeeklyVisits
    });
});

app.get('/api/stats/monthly', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const monthlyVisits = visitorCounter.getMonthlyVisits();
    const slicedData = Object.entries(monthlyVisits).slice(startIndex, endIndex);
    const slicedMonthlyVisits = Object.fromEntries(slicedData);
    res.json({
        totalVisitors: res.locals.totalVisitors,
        page: page,
        limit: limit,
        totalPages: Math.ceil(Object.keys(monthlyVisits).length / limit),
        monthlyVisits: slicedMonthlyVisits
    });
});

app.get('/api/stats/yearly', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const yearlyVisits = visitorCounter.getYearlyVisits();
    const slicedData = Object.entries(yearlyVisits).slice(startIndex, endIndex);
    const slicedYearlyVisits = Object.fromEntries(slicedData);
    res.json({
        totalVisitors: res.locals.totalVisitors,
        page: page,
        limit: limit,
        totalPages: Math.ceil(Object.keys(yearlyVisits).length / limit),
        yearlyVisits: slicedYearlyVisits
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```
