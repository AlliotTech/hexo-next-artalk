/* global hexo */

'use strict';

const Util = require('@next-theme/utils');
const utils = new Util(hexo, __dirname);

// Artalk binds the page vote widget to these class names by default.
const pageVoteHtml = `
  <div class="artalk-page-vote">
    {%- set vote_up = __('post.vote.up') %}
    {%- if vote_up == 'post.vote.up' %}{% set vote_up = 'Like' %}{% endif %}
    {%- set vote_down = __('post.vote.down') %}
    {%- if vote_down == 'post.vote.down' %}{% set vote_down = 'Dislike' %}{% endif -%}
    <button class="artalk-page-vote-up artalk-page-vote-button btn" type="button" title="{{ vote_up }}" aria-label="{{ vote_up }}" disabled>
      <i class="far fa-thumbs-up" aria-hidden="true"></i>
      <span class="artalk-page-vote-up-count"></span>
    </button>
    <button class="artalk-page-vote-down artalk-page-vote-button btn" type="button" title="{{ vote_down }}" aria-label="{{ vote_down }}" disabled>
      <i class="far fa-thumbs-down" aria-hidden="true"></i>
      <span class="artalk-page-vote-down-count"></span>
    </button>
  </div>`;

// Colors, borders and typography come from NexT's own `.btn` tokens,
// so the widget follows the active scheme, dark mode and user overrides.
const pageVoteCss = `<style>
.artalk-page-vote{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;margin:60px 0 0}
.artalk-page-vote + .comments{margin-top:28px}
.artalk-page-vote .artalk-page-vote-button{min-width:76px;cursor:pointer;transition:background-color .2s,border-color .2s,color .2s,opacity .2s,transform .1s}
.artalk-page-vote .artalk-page-vote-button + .artalk-page-vote-button{margin:0}
.artalk-page-vote .artalk-page-vote-button i{margin-right:6px}
.artalk-page-vote .artalk-page-vote-button[disabled]{opacity:.6;cursor:default}
.artalk-page-vote .artalk-page-vote-button:not([disabled]):active{transform:scale(.96)}
.artalk-page-vote .artalk-page-vote-button.active{background:var(--btn-default-hover-bg);border-color:var(--btn-default-hover-border-color);color:var(--btn-default-hover-color)}
.artalk-page-vote .artalk-page-vote-button.active i{font-weight:900}
@media(max-width:567px){.artalk-page-vote{margin-top:40px}.artalk-page-vote .artalk-page-vote-button{min-width:68px}}
</style>`;

function registerComment(injects) {
  const config = utils.defaultConfigFile('artalk', 'default.yaml');
  if (!config.enable) return;

  const commentHtml = (config.pageVote ? pageVoteHtml : '')
    + '<div class="comments" id="comments"></div>';

  // `cache: true` keys the fragment cache by view path only (hexo/lib/plugins/helper/partial),
  // so a cached fragment would pin the `__()` vote labels to the first rendered language.
  injects.comment.raw('artalk', commentHtml, {}, config.pageVote ? {} : { cache: true });
  injects.bodyEnd.raw('artalk', utils.getFileContent('artalk.njk'));
  injects.head.raw('artalk', `<link rel="preconnect" href="${config.server}">`
    + (config.pageVote ? pageVoteCss : ''), {}, {});
}

function registerPostMeta(injects) {
  const config = utils.defaultConfigFile('artalk', 'default.yaml');
  if (!config.enable || !config.server) return;

  injects.postMeta.raw(
    'artalk_pv_count',
    `{% if config.artalk.pvCount %}
      <span class="post-meta-item" title="{{ __('post.views') }}">
        <span class="post-meta-item-icon">
          <i class="far fa-eye"></i>
        </span>
        <span class="post-meta-item-text">{{ __('post.views') + __('symbol.colon') }}</span>
        <span id="ArtalkPV" data-page-key="{{ url_for(post.path) | replace(r/index\\.html$/, '') }}"></span>
      </span>
    {% endif %}`,
    {},
    {}
  );

  injects.postMeta.raw(
    'artalk_comment_count',
    `{% if post.comments and config.artalk.commentCount %}
      {% set post_meta_comment = __('post.comments.artalk') %}
      {% if post_meta_comment == 'post.comments.artalk' %}
        {% set post_meta_comment = 'Artalk' %}
      {% endif %}
      <span class="post-meta-item" title="{{ post_meta_comment }}">
        <span class="post-meta-item-icon">
          <i class="far fa-comment"></i>
        </span>
        <span class="post-meta-item-text">{{ post_meta_comment + __('symbol.colon') }}</span>
        <a href="{{ url_for(post.path) }}#comments" itemprop="discussionUrl">
          <span id="ArtalkCount" class="post-comments-count" data-page-key="{{ url_for(post.path) | replace(r/index\\.html$/, '') }}" itemprop="commentCount"></span>
        </a>
      </span>
    {% endif %}`,
    {},
    {}
  );
}

hexo.extend.filter.register('theme_inject', registerComment);
hexo.extend.filter.register('theme_inject', registerPostMeta);
