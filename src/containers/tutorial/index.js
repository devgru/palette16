import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { alea } from 'seedrandom';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

import './index.css';
import Swatch from '../../presentational/Swatch';
import { loadBase16Palette } from '../../modules/currentPalette';
import farthestOf from '../../utils/farthestOf';

class Tutorial extends Component {
  constructor(props) {
    super(props);
    props.loadBase16Palette('solarized-light');
  }
  componentDidMount() {
    this.updateStyles();
  }

  componentDidUpdate() {
    this.updateStyles();
  }

  updateStyles() {
    const { style } = document.documentElement;
    const { base } = this.props;

    if (!base) {
      return;
    }

    base.forEach((color, i) => {
      style.setProperty('--color' + i, color);
    });
  }

  render() {
    const { all } = this.props;
    if (!all) {
      return null;
    }

    const arng = new alea('hello there');

    const background = all[0];
    const foreground = all[7];

    const border1 = [
      background,
      foreground,
      background,
      foreground,
      background,
      foreground,
      background,
      foreground,
      background,
      foreground,
      background,
      foreground,
      background,
      foreground,
      background,
      foreground,
    ];

    const GAP = 100;
    return (
      <ParallaxProvider className="Tutorial">
        <div>
          <div className="Tutorial-page">
            <div className="Tutorial-text">
              <h1>Программисты и цвета</h1>
              <p>
                Меня зовут Дима и я программист. Я учился программировать с
                младшей школы, все пять лет ВУЗа смотрел в экран по 12 часов в
                день, практически каждый день. Уже десять лет я работаю
                программистом.
              </p>
              <p>
                Я радуюсь тому, что у меня всё ещё хорошее зрение и стараюсь о
                нём заботиться.
              </p>
              <p>
                Если и вы хотите тоже — устраивайтесь поудобнее, я расскажу вам
                о цветовых схемах.
              </p>
            </div>
          </div>
          <div className="Tutorial-page Tutorial-page_border_inverse" />

          <div className="Tutorial-page Tutorial-page_inverse">
            <div className="Tutorial-text">
              <h1>Что мы видим?</h1>
              <p>
                Перед глазами программиста часто находится среда разработки или
                терминал.
              </p>
              <p>
                В таких программах обычно можно настроить визуальную «тему»:
                цвета, шрифты, высоту строк и т.п.
              </p>
              <p>
                Я не буду рассказывать о выборе шрифта и других настройках,
                ограничусь только цветами.
              </p>
              <p>
                Если вы нашли для себя идеальную тему, но вас не устраивают
                цвета — всегда можно заменить их на другие. Если вы сделаете это
                и напишите мне — я буду знать, что не зря создал этот документ.
              </p>
            </div>
          </div>
          <div className="Tutorial-page Tutorial-page_border" />
          <div className="Tutorial-page">
            <div className="Tutorial-text">
              <h1>Цветовая схема</h1>
              <p>
                При настройке темы можно использовать любое количество цветов.
              </p>
              <p>Набор цветов называют цветовой схемой.</p>
              <p>
                Я буду рассказывать о цветовых схемах, попадающих под стандарт{' '}
                <a href="http://chriskempson.com/projects/base16/">base16</a>.
              </p>
              <p>Такие цветовые схемы состоят из 16 цветов.</p>
              <p>
                8 цветов основной последовательности, первый из которых является
                основным цветом фона а последний — основным цветом текста.
              </p>
              <p>
                8 акцентных цветов, использующихся для выделения текста по
                смыслу.
              </p>
            </div>
          </div>
          <div className="Tutorial-page">
            <div className="Tutorial-text">
              <h1>Современные схемы</h1>
              <p>
                В 2011{' '}
                <a href="https://twitter.com/ethanschoonover">Этан Шуновер</a>{' '}
                представил цветовую схему{' '}
                <a href="http://ethanschoonover.com/solarized">Solarized</a>.
              </p>
              <p>
                В 2013{' '}
                <a href="https://twitter.com/atelierbram/">Брам Де-Хен</a>{' '}
                создал набор схем{' '}
                <a href="http://atelierbram.github.io/syntax-highlighting/atelier-schemes/">
                  Atelier
                </a>.
              </p>
            </div>
          </div>
          <div className="Tutorial-page Tutorial-page_narrow Tutorial-page_inverse">
            <div className="Tutorial-wide">
              {border1.map((color, i) => (
                <Parallax
                  className="Tutorial-swatch"
                  key={i}
                  offsetYMin={-(arng() * GAP * 3)}
                  offsetYMax={arng() * GAP}
                >
                  <div
                    className="Tutorial-swatch"
                    style={{ background: color }}
                  />
                </Parallax>
              ))}
            </div>
          </div>
        </div>
      </ParallaxProvider>
    );
  }
}

Tutorial.propTypes = {
  all: PropTypes.arrayOf(PropTypes.string),
  currentPalette: PropTypes.shape({
    palette: PropTypes.shape({
      base: PropTypes.arrayOf(PropTypes.string),
      accents: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

const mapStateToProps = ({ currentPalette }) => {
  const base = [];
  const accents = [];
  if (!currentPalette.slots) {
    return {};
  }
  currentPalette.slots.forEach(slot => {
    if (slot.role === 'accent') {
      accents.push(...slot.colors);
    } else {
      base.push(...slot.colors);
    }
  });

  const all = base.concat(accents);

  return {
    currentPalette,
    all,
    accents,
    base,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadBase16Palette }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Tutorial)
);
