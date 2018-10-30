import {Component, PropTypes} from 'react';
import _                      from 'lodash';
import {QTitle}               from '../../Components/QTitle/Main.jsx';
import {}                     from './FlatDoc.scss';
import Functions from '../../Functions/Functions.jsx'

export class Faq extends Component {

  componentWillMount () {
    let $root = $('html, body');

    $(document).on('flatdoc:ready', function () {

      let docMenu = $('.flatdoc-wrapper')

      let lastScrollTop = 0

      $(window).scroll(function (event) {
        let $menu = $('.flatdoc-menu')
        let currentScroll = $(this).scrollTop()

        if (currentScroll > lastScrollTop) {
          $menu.scrollTop(currentScroll)
        }
        else {
          let difference = lastScrollTop - currentScroll
          $menu.scrollTop($menu.scrollTop() - difference)
        }

        lastScrollTop = currentScroll
      })

      docMenu.find('a').on('click', function (e) {

        e.preventDefault();
        e.stopPropagation();

        let link = this.getAttribute('href')

        if (link[0] != "#") {
          window.open(link)
        }
        else {
          let $this = $(this);

          docMenu.find('a.active').removeClass('active');

          $this.addClass('active');

          $root.animate({
            scrollTop: $(link).offset().top - ($('.topnavbar').height() + 60)
          }, 250);
        }

      });

    })
  }

  //-
  //                                                      Component Mounted

  componentDidMount () {
    Functions.Shell.hitFeature('Opening FAQ')

    Flatdoc.run({
      fetcher: Flatdoc.file('Files/readme.md')
    })
  }

  //-
  //                                                    Component Rendering
  render () {
    //Return Component Content
    return (
      <section>
        <div className="content-wrapper page-faq" style={{ padding: 0 }}>
          <QTitle heading="Help & FAQ" style={{ margin: 0 }}/>
          <div className="row">
            <div className="flatdoc-wrapper" style={{ marginLeft: 0, marginTop: 0 }}>
              <div role="flatdoc" className="flatdoc">
                <div role="flatdoc-menu" className="flatdoc-menu"></div>
                <div role="flatdoc-content" className="flatdoc-content"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

}
