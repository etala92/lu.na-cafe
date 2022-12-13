import React from "react";

// This global flag enables manual initialization.
// window.CMS_MANUAL_INIT = true;
import CMS from "netlify-cms-app";
import { de } from "netlify-cms-locales";

CMS.registerLocale("de", de);

CMS.init(process.env.CMS_CONF);

console.log(process.env.CMS_CONF);
console.log("BRANCH:", process.env.CMS_BRANCH);

CMS.registerPreviewStyle("/main.css");
