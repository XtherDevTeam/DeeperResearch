create table config (
    deep_research_model string not null default 'gemini-2.0-flash-thinking-exp-01-21',
    secret not null default 'MayAllTheBeautyBeBlessed',
    google_search_engine_key not null default '',
    google_search_engine_cx_id not null default '',
    google_api_key not null default ''
);

create table research_history (
    id integer primary key autoincrement,
    name string not null,
    history string not null,
    created_at integer not null
);