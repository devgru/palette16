import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import seedrandom from 'seedrandom';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

import colorToRgbPoint from '../../utils/colorToRgbPoint';
import colorToHsvPoint from '../../utils/colorToHsvPoint';
import colorToHslPoint from '../../utils/colorToHslPoint';
import { loadBase16Palette } from '../../modules/currentPalette';
import InlineSwatch from '../../presentational/InlineSwatch';
import GithubCorner from '../../presentational/GithubCorner';
import Matrix from '../../presentational/Matrix';
import ColorSpace from '../../presentational/ColorSpace';
import Page1 from '../../presentational/TutorialPages/01-Title';
import Page2 from '../../presentational/TutorialPages/02-Intro';

import './index.css';

const Alea = seedrandom.alea;

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
    const { all, base } = this.props;
    if (!all) {
      return null;
    }

    const baseReversed = [...base].reverse();

    const arng = new Alea('hello there');

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

    const GAP = 40;
    return (
      <ParallaxProvider>
        <div className="Tutorial">
          <GithubCorner />
          <Page1 />
          <div className="Tutorial-page Tutorial-page_inverse_open" />
          <Page2 />
          <div className="Tutorial-page Tutorial-page_inverse_close" />
          <div className="Tutorial-page">
            <div className="Tutorial-text">
              <h1>Цветовая схема</h1>
              <p>
                При настройке темы можно использовать любое количество цветов.
                Набор цветов называют цветовой схемой.
              </p>
              <p>
                По моему наблюдению, в 2007-2012 окружающие меня программисты
                работали в стандартных темах IDE или меняли цветовую схему на
                «тёмную», не особо заморачиваясь выбором конкретных цветов.
              </p>
              <p>
                Со временем ситуация улучшилась — коллеги стали активнее
                экспериментировать с настройками IDE, некоторые цветовые схемы
                стали популярными. Теперь я редко вижу стандартные цвета на
                чужих мониторах.
              </p>
            </div>
          </div>
          <div className="Tutorial-page Tutorial-page_inverse_open" />
          <div className="Tutorial-page Tutorial-page_inverse">
            <div className="Tutorial-text">
              <h1>Современные схемы</h1>
              <p>
                В этом документе я ссылаюсь на современные цветовые схемы и
                стандарт их разработки —{' '}
                <a href="http://chriskempson.com/projects/base16/">base16</a>.
              </p>
              <p>
                В 2011{' '}
                <a href="https://twitter.com/ethanschoonover">Этан Шуновер</a>{' '}
                представил цветовую схему{' '}
                <a href="http://ethanschoonover.com/solarized">Solarized</a>. Я
                использую эту схему в своих IDE и терминалах. И в этом документе
                по умолчанию используется именно она.
              </p>
              <p>
                В 2013{' '}
                <a href="https://twitter.com/atelierbram/">Брам Де-Хен</a>{' '}
                создал набор схем{' '}
                <a href="http://atelierbram.github.io/syntax-highlighting/atelier-schemes/">
                  Atelier
                </a>.
              </p>
              <p>
                В 2016{' '}
                <a href="https://twitter.com/trevordmiller">Тревор Миллер</a>{' '}
                представил схему{' '}
                <a href="https://trevordmiller.com/projects/nova">Nova</a>.
              </p>
              <p>
                В 2018 <a href="https://twitter.com/sarah_edo">Сара Драснер</a>{' '}
                создала тему{' '}
                <a href="https://github.com/sdras/night-owl-vscode-theme">
                  Night Owl
                </a>, использующую одноименную цветовую схему.
              </p>
            </div>
          </div>
          <div className="Tutorial-page Tutorial-page_inverse_close" />
          <div className="Tutorial-page Tutorial-page">
            <div className="Tutorial-text">
              <h1>Состав схемы</h1>
              <p>Стандарт base16 предлагает собирать схему из 16 цветов:</p>
              <ul>
                <li>
                  8 в основной последовательности,{' '}
                  <InlineSwatch color={background} />
                  первый из которых является основным цветом фона а{' '}
                  <InlineSwatch color={foreground} />
                  последний — основным цветом текста.
                </li>
                <li>
                  8 акцентных, использующихся для выделения текста или фона по
                  смыслу.
                </li>
              </ul>
            </div>
            <div className="Tutorial-text">
              <h1>Восемь основных оттенков</h1>
              <p>
                Основная последовательность{' '}
                {base.map(color => <InlineSwatch color={color} />)} состоит из
                трёх групп.
              </p>
              <p>
                <InlineSwatch color={all[0]} /> и{' '}
                <InlineSwatch color={all[1]} /> — фоны, основной и
                альтернативный (например, для выделения текущей строки в
                редакторе).
              </p>
              <p>
                <InlineSwatch color={all[2]} />
                <InlineSwatch color={all[3]} />
                <InlineSwatch color={all[4]} />
                <InlineSwatch color={all[5]} /> — промежуточные цвета. Ими
                рисуют «приглушённый» текст (номера строк, ключевые слова языка
                программирования), линейки и границы.
              </p>
              <p>
                <InlineSwatch color={all[6]} /> и{' '}
                <InlineSwatch color={all[7]} /> — цвета текста.
              </p>
              <p>
                В большинстве base16-совместимых схем основную
                последовательность можно развернуть, поменяв порядок цветов. При
                переносе цветов в файлы, импортируемые в настройки программы,
                такие схемы публикуют в двух версиях, светлой и тёмной. В этом
                документе я иногда «разворачиваю» схему, чтобы вы увидели как
                она работает в инверсии.
              </p>
            </div>
            <div className="Tutorial-text">
              <Matrix colors={base} />
            </div>
            <div className="Tutorial-text">
              <p>
                В таблице показано, как будет выглядеть сочетание текста и фона.
                Если цветовая схема спроектирована правильно, цвета каждой из
                групп будут контрастны с остальными группами.
              </p>
              <p>
                Обратите внимание, как группы цветов расположены в
                LAB-пространстве:
              </p>
            </div>
            <div className="Tutorial-wide">
              <ColorSpace
                width={600}
                height={600}
                colors={base}
                controlsOptions={{
                  enableKeys: false,
                  enableZoom: false,
                }}
              />
            </div>
            <div className="Tutorial-text">
              <h1>LAB-пространство?</h1>
              <p>
                Цвета обычно хранятся и передаются в формате RGB — по байту на
                каждую из цветовых компонент: красный, зелёный и синий цвета.
              </p>
              <p>
                RGB идеально подходит чтобы сообщить монитору насколько ярко
                нужно включить каждый из суб-пикселей, но для человека это не
                лучший формат описания цвета. В RGB трудно оценивать
                характеристики цвета — яркость, насыщенность, тон. Например,{' '}
                <InlineSwatch color="#080" /> #080 будет куда ярче чем #008{' '}
                <InlineSwatch color="#008" />, хотя цифры использованы
                идентичные.
              </p>
              <p>
                Производные от RGB модели HSL и HSV используют другие
                характеристики для описания цвета: тон (Hue), насыщенность
                (Saturation) и яркость или значение (Lightness, Value).
                Отличаются эти две модели только в последней характеристике: в
                HSL максимальной яркостью обладает только белый цвет, в HSV
                максимальное значение будет у всех цвета, в которых хотя бы один
                из компонентов RGB имеет максимальное значение.
              </p>
              <p>
                Вот так модели RGB, HSL и HSV можно представить в пространстве:
              </p>
            </div>
            {[colorToRgbPoint, colorToHslPoint, colorToHsvPoint].map(
              (fn, i) => (
                <ColorSpace
                  key={i}
                  width={300}
                  height={300}
                  colors={[background]}
                  controlsOptions={{
                    enableKeys: false,
                    enableZoom: false,
                  }}
                  colorToPoint={fn}
                  gridOpacity={1}
                />
              )
            )}
            <div className="Tutorial-text">
              <p>
                CIE LAB или просто LAB — другая модель, она так же содержит
                яркость (Lightness), но здесь яркость определена с учётом того,
                как наши глаза воспринимают свет. Подробнее об можно прочитать{' '}
                <a href="https://habr.com/post/209738/">на Хабре</a>. Координаты
                A и B не имеют отдельных названий, это просто расстояние от
                центральной оси L, на которой лежат цвета от чёрного до белого.
              </p>
              <p>
                Чтобы проще ориентироваться в цветовом пространстве можно также
                использовать систему координат HCL (она же CIE LCH). В ней
                декартовы координаты A и B заменяются полярными — углом H (Hue),
                обозначающим тон и радиусом C (Chroma).
              </p>
            </div>
            <ColorSpace
              width={300}
              height={300}
              colors={[background]}
              controlsOptions={{
                enableKeys: false,
                enableZoom: false,
              }}
              gridOpacity={1}
            />
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
