import React from 'react';
import PropTypes from 'prop-types';
import TutorialContainer from '../tutorial-container';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadBase16Palette } from '../../modules/currentPalette';
import InlineSwatch from '../../presentational/InlineSwatch';
import GithubCorner from '../../presentational/GithubCorner';
import Matrix from '../../presentational/Matrix';
import ColorSpace from '../../presentational/ColorSpace';
import Header from '../../presentational/TutorialHeader';
import Page1 from '../../presentational/TutorialPages/01-Title';
import Page2 from '../../presentational/TutorialPages/02-Intro';
import Page4 from '../../presentational/TutorialPages/04-ColorScheme';
import InversePage from '../../presentational/InversePage';
import CodeExample from '../../presentational/CodeExample';
import HueCircle from '../../presentational/HueCircle';
import SchemeBar from '../../presentational/SchemeBar';

import './index.css';

const diff = `
Index: languages/ini.js
=======================================
--- languages/ini.js    (revision 199)
+++ languages/ini.js    (revision 200)
@@ -1,8 +1,7 @@
 hljs.LANGUAGES.ini =
 {
   case_insensitive: true,
-  defaultMode:
-  {
+  defaultMode: {
     contains: ['comment', 'title', 'setting'],
     illegal: '[^\\\\s]'
   },
`;

const inlineSwatch = color => <InlineSwatch key={color} color={color} />;

class Tutorial extends TutorialContainer {
  constructor(props) {
    super(props);
    props.loadBase16Palette('solarized-light');
  }

  render() {
    const { base, accents, all, palettes, loadBase16Palette } = this.props;
    if (!base) {
      return null;
    }

    const allInverted = [...[...base].reverse(), ...accents];

    const background = base[0];
    const foreground = base[7];

    const selectedPalettes = [
      'solarized-light',
      'solarized-dark',
      'isotope',
      'tutorial',
    ].reduce(
      (hash, key) => ({
        ...hash,
        [key]: palettes[key],
      }),
      {}
    );

    return (
      <div className="Tutorial">
        <GithubCorner />
        <Page1 />
        <InversePage>
          <Page2 />
          <div className="Tutorial-text">
            <Header hash="interactive-elements">Интерактивные элементы</Header>
            <p>
              Эта страница создана, чтобы дать вам возможность не только узнать
              новое, но и сразу проверить эти знания. Для этого используется
              набор интерактивных элементов.
            </p>
            <p>
              Простейший интерактивный элемент — свотч, цветовая плашка:{' '}
              <InlineSwatch color="#00FF55" />. Свотч можно выделить курсором
              или пальцем, при этом во всплывающем блоке можно будет узнать
              больше о цвете: наиболее подходящее название, координаты в
              пространствах RGB и HCL, оценку характеристик этого цвета.
            </p>
            <p>
              Наборы цветов в контексте цветовых моделей изображены на
              трёхмерных визуализациях. Каждую можно покрутить с помощью курсора
              или пальца. Попробуйте:
            </p>
          </div>
          <div className="Tutorial-wide">
            <ColorSpace
              width={600}
              height={400}
              colors={[]}
              background={base[7]}
              gridOpacity={1}
              controlsOptions={{
                enableKeys: false,
                enableZoom: false,
              }}
            />
          </div>
        </InversePage>
        <Page4 />
        <InversePage>
          <div className="Tutorial-text">
            <Header hash="modern-schemes">Современные схемы</Header>
            <p>
              В этом документе я ссылаюсь на современные цветовые схемы и
              стандарт их разработки —{' '}
              <a href="http://chriskempson.com/projects/base16/">base16</a>.
            </p>
            <p>
              В 2011{' '}
              <a href="https://twitter.com/ethanschoonover">Этан Скуноувер</a>{' '}
              представил цветовую схему{' '}
              <a href="http://ethanschoonover.com/solarized">Solarized</a>. Я
              использую эту схему в своих IDE и терминалах. И в этом документе
              по умолчанию используется именно она.
            </p>
            <p>
              В 2013 <a href="https://twitter.com/atelierbram/">Брам Де-Хен</a>{' '}
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
        </InversePage>
        <div className="Tutorial-page">
          <div className="Tutorial-text">
            <Header hash="scheme-anatomy">Состав схемы</Header>
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
            <Header hash="scheme-base">Восемь основных оттенков</Header>
            <p>
              Основная последовательность {base.map(inlineSwatch)} состоит из
              трёх групп.
            </p>
            <p>
              <InlineSwatch color={base[0]} /> и{' '}
              <InlineSwatch color={base[1]} /> — фоны, основной и альтернативный
              (например, для выделения текущей строки в редакторе).
            </p>
            <p>
              <InlineSwatch color={base[2]} />
              <InlineSwatch color={base[3]} />
              <InlineSwatch color={base[4]} />
              <InlineSwatch color={base[5]} /> — промежуточные цвета. Ими рисуют
              «приглушённый» текст (номера строк, ключевые слова языка
              программирования), линейки и границы.
            </p>
            <p>
              <InlineSwatch color={base[6]} /> и{' '}
              <InlineSwatch color={base[7]} /> — цвета текста.
            </p>
            <p>
              В большинстве base16-совместимых схем основную последовательность
              можно развернуть, поменяв порядок цветов. При переносе цветов в
              файлы, импортируемые в настройки программы, такие схемы публикуют
              в двух версиях, светлой и тёмной. В этом документе я иногда
              «разворачиваю» схему, чтобы вы увидели как она работает в
              инверсии.
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
              height={400}
              colors={base}
              controlsOptions={{
                enableKeys: false,
                enableZoom: false,
              }}
            />
            <span className="Tutorial-aside">
              О цветовых моделях и их изображении в трёхмерном пространстве
              можно прочитать на{' '}
              <a href="#/tutorial/color-spaces">отдельной странице</a>.
            </span>
          </div>
          <div className="Tutorial-text">
            <p>
              В цветовой схеме solarized группы цветов отделены друг от друга,
              при этом внутри группы расстояние не так велико.
            </p>
          </div>
        </div>
        <InversePage>
          <div className="Tutorial-text">
            <Header hash="accents">Акценты</Header>
            <p>
              Акценты {accents.map(inlineSwatch)} не делятся на группы, каждый
              из них должен заметно отличаться от всех остальных цветов в схеме.
              Тем не менее, я делю цвета по «температуре», чтобы было легче
              ориентироваться.
            </p>
            <p>
              Чаще всего акценты отличаются цветовым тоном, а яркость и
              насыщенность могут быть практически одинаковы. Посмотрите:
            </p>
          </div>
          <div className="Tutorial-wide">
            <ColorSpace
              width={600}
              height={400}
              colors={accents}
              background={base[7]}
              controlsOptions={{
                enableKeys: false,
                enableZoom: false,
              }}
            />
          </div>
          <div className="Tutorial-text">
            <p>
              Если не учитывать яркость и насыщенность, можно изучить
              распределение акцентов по тонам. Если точки распределены
              неравномерно, на окружности будут видны пустые области — это те
              тона, которые можно бы использовать для увеличения контрастности
              акцентов.
            </p>
          </div>
          <div className="Tutorial-wide">
            <HueCircle foreground={base[0]} colors={accents} />
          </div>
          <div className="Tutorial-text">
            <Header hash="warm-colors">Тёплые цвета</Header>
            <p>
              Два цвета, которые используются часто и несут определённый смысл —{' '}
              <InlineSwatch color={accents[0]} /> красный и{' '}
              <InlineSwatch color={accents[3]} /> зелёный. Например, удалённые и
              добавленные строки при просмотре патчей:
            </p>
            <CodeExample colors={allInverted} language="diff">
              {diff}
            </CodeExample>
            <p>
              Тёплые цвета часто используются в интерфейсах для обозначения
              приоритетов, состояний (ошибка, предупреждение), разрешений.
            </p>
            <p>
              <InlineSwatch color={accents[1]} /> Оранжевый и{' '}
              <InlineSwatch color={accents[2]} /> жёлтый используются реже, но
              важно, тем не менее, делать их различимыми.
            </p>
            <Header hash="cold-colors">Холодные цвета</Header>
            <p>
              Холодными чаще всего будут три акцента, с четвёртого по седьмой:{' '}
              <InlineSwatch color={accents[4]} />
              <InlineSwatch color={accents[5]} />
              <InlineSwatch color={accents[6]} />
            </p>
            <Header hash="line-of-purple">Пурпурные цвета</Header>
            <p>
              Восьмой цвет <InlineSwatch color={accents[7]} /> отличается от
              остальных, он чаще всего попадает в т.н.{' '}
              <a href="https://en.wikipedia.org/wiki/Line_of_purples">
                пурпурную линию
              </a>, группу цветов между красным и фиолетовым. Их отличие от
              спектральных цветов в том, что такой цвет не может быть
              монохроматичным, его нельзя получить излучением одного лазера.
              Такой цвет нельзя назвать ни тёплым ни холодным, его оттенок будет
              восприниматься как тёплый или холодный в зависимости от фона, на
              котором вы его увидите.
            </p>
          </div>
          <div className="Tutorial-wide">
            <Header hash="full-palette">Все цвета схемы</Header>
            <p>Посмотрим на расположение всех цветов схемы в пространстве:</p>
            <ColorSpace
              width={600}
              height={400}
              colors={all}
              background={base[7]}
              controlsOptions={{
                enableKeys: false,
                enableZoom: false,
              }}
            />
            <p>
              В большинстве схем акценты образуют окружность, примерно через
              центр которой проходит линия основной последовательности.
            </p>
          </div>
        </InversePage>
        <SchemeBar schemes={selectedPalettes} loadScheme={loadBase16Palette} />
      </div>
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

const mapStateToProps = ({ currentPalette, paletteList }) => {
  const { palettes } = paletteList;
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
    palettes,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadBase16Palette }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
