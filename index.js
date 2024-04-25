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