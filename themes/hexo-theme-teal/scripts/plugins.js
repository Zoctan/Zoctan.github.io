var {
    version,
    name
} = require('../package.json');

hexo.extend.helper.register('theme_version', function () {
    return version;
});

var source = function (path, cache, ext) {
    if (cache) {
        var minFile = `${path}${ext === '.js' ? '.min' : ''}${ext}`
        return hexo.theme.config.cdn ? `//unpkg.com/${name}@latest${minFile}` : `${minFile}?v=${version}`;
    } else {
        return path + ext;
    }
};

hexo.extend.helper.register('theme_js', function (path, cache) {
    return source(path, cache, '.js');
});

hexo.extend.helper.register('theme_css', function (path, cache) {
    return source(path, cache, '.css');
});

function renderImage(src, alt = '', title = '') {
    return `<figure class="image-bubble">
                <div class="img-lightbox">
                    <div class="overlay"></div>
                    <img src="${src}" alt="${alt}" title="${title}">
                </div>
                <div class="image-caption">${title || alt}</div>
            </figure>`;
}

hexo.extend.tag.register('image', function ([src, alt = '', title = '']) {
    return hexo.theme.config.lightbox ? renderImage(src, alt, title) : `<img src="${src}" alt="${alt}" title="${title}">`;
});

hexo.extend.filter.register('before_post_render', function (data) {
    if (hexo.theme.config.lightbox) {
        // 包含图片的代码块 <escape>[\s\S]*\!\[(.*)\]\((.+)\)[\s\S]*<\/escape>
        // 行内图片 [^`]\s*\!\[(.*)\]\((.+)\)([^`]|$)
        data.content = data.content.replace(/<escape>.*\!\[(.*)\]\((.+)\).*<\/escape>|([^`]\s*|^)\!\[(.*)\]\((.+)\)([^`]|$)/gm, function (match) {

            // 忽略代码块中的图片
            if (/<escape>[\s\S]*<\/escape>|.?\s{3,}/.test(match)) {
                return match;
            }

            return match.replace(/\!\[(.*)\]\((.+)\)/, function (img, alt, src) {
                var attrs = src.split(' ');
                var title = (attrs[1] && attrs[1].replace(/\"|\'/g, '')) || '';
                return `{% image ${attrs[0]} '${alt}' '${title}' %}`;
            })
        });
    }
    return data;
});
