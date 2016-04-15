package ru.esoft.web.ui.servlets.impl;

import com.google.inject.servlet.GuiceFilter;

import javax.servlet.annotation.WebFilter;

@WebFilter(urlPatterns = "/*", asyncSupported = true)
public class AppGuiceFilter extends GuiceFilter {
}