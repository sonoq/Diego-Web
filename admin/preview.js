// Registro de previsualización para Decap CMS
CMS.registerPreviewStyle("../style.css");

// Previsualización de la Página de Inicio
const InicioPreview = createClass({
  render: function() {
    const entry = this.props.entry;
    const hero = entry.getIn(['data', 'hero']);
    const sobreMi = entry.getIn(['data', 'sobre_mi']);
    const contacto = entry.getIn(['data', 'contacto']);

    return h('div', {},
      // Hero
      h('header', { className: 'hero', style: { height: '500px', position: 'relative' } },
        h('div', { className: 'hero-bg' },
          h('img', { src: this.props.getAsset(hero.get('image')), style: { width: '100%', height: '100%', objectFit: 'cover' } }),
          h('div', { className: 'hero-overlay' })
        ),
        h('div', { className: 'hero-content', style: { opacity: 1, transform: 'none', textAlign: 'center', color: 'white' } },
          h('p', { className: 'hero-subtitle' }, hero.get('subtitle')),
          h('h1', { className: 'hero-title', dangerouslySetInnerHTML: { __html: hero.get('title_html') } }),
          h('p', { className: 'hero-tagline' }, hero.get('tagline')),
          h('a', { className: 'hero-cta' }, hero.get('cta_text'))
        )
      ),
      // Sobre Mí
      h('section', { className: 'section sobre-mi' },
        h('div', { className: 'container' },
          h('div', { className: 'sobre-mi-grid' },
            h('div', { className: 'sobre-mi-image' },
              h('img', { src: this.props.getAsset(sobreMi.get('image')) })
            ),
            h('div', { className: 'sobre-mi-text' },
              h('h2', { className: 'section-title' }, sobreMi.get('title')),
              this.props.widgetsFor('sobre_mi').getIn(['widgets', 'paragraphs']).map((p, index) => h('p', { key: index }, p))
            )
          )
        )
      ),
      // Contacto
      h('section', { className: 'section contacto' },
        h('div', { className: 'container' },
          h('h2', { className: 'section-title' }, contacto.get('title')),
          h('p', { className: 'contacto-intro' }, contacto.get('intro')),
          h('div', { className: 'contacto-grid' },
            h('div', { className: 'contacto-item' },
              h('span', { className: 'contacto-label' }, 'Email'),
              h('span', { className: 'contacto-link' }, contacto.get('email'))
            )
          )
        )
      )
    );
  }
});

// Previsualización de una Obra (Galería)
const ObraPreview = createClass({
  render: function() {
    const entry = this.props.entry;
    return h('div', { className: 'section galeria', style: { padding: '20px' } },
      h('div', { className: 'gallery-item', style: { maxWidth: '400px', margin: '0 auto', opacity: 1 } },
        h('div', { className: 'gallery-image-wrapper' },
          h('img', { src: this.props.getAsset(entry.getIn(['data', 'image'])) }),
          h('div', { className: 'gallery-overlay', style: { opacity: 1 } },
            h('span', { className: 'gallery-label' }, entry.getIn(['data', 'label'])),
            h('span', { className: 'gallery-year' }, entry.getIn(['data', 'year']))
          )
        )
      )
    );
  }
});

CMS.registerPreviewTemplate("inicio", InicioPreview);
CMS.registerPreviewTemplate("obras", ObraPreview);
