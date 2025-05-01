create table config (
    deep_research_model string not null default 'gemini-2.0-flash-thinking-exp-01-21',
    secret not null default 'MayAllTheBeautyBeBlessed',
    google_search_engine_key not null default '',
    google_search_engine_cx_id not null default '',
    google_api_key not null default '',
    thinking_token_budget integer not null default 8192
);

create table research_history (
    id integer primary key autoincrement,
    name string not null,
    history string not null,
    created_at integer not null
);


create table extra_infos (
    id integer primary key autoincrement,
    name string not null,
    description string not null,
    enabled integer not null default 1,
    content string not null,
    author string not null
);

create table user_scripts (
    id integer primary key autoincrement,
    name string not null,
    content string not null,
    enabled integer not null default 1,
    description string not null,
    author string not null
);