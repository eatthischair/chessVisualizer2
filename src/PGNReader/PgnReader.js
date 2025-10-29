import callRecurse from './CallRecurse';
import { initialBoard } from '../utils/constants';
const PgnReader = pgn => {
  let cleanPgn = pgn.split('');

  cleanPgn = pgn
    .replace(
      /(\{[^}]*\}|\[[^\]]*\]|\([^)]*\)|\?\?|\!\?|\!\!|\?\!|\?|!|\+|#|1-0|1\/2-1\/2|0-1|\*|\d+\.)|\r?\n|(\w)x(\w)/g,
      (match, p1, p2, p3) => {
        if (p2 && p3) {
          return p2 + p3;
        }
        return ' ';
      }
    )
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ');

  var boardArray = [];
  cleanPgn.forEach((item, index) => {
    let calcForWhite = false;
    let prevItem = cleanPgn[index - 1];
    if (index % 2 === 0) calcForWhite = true;
    let nextBoard = callRecurse(
      item,
      calcForWhite,
      boardArray,
      initialBoard,
      prevItem
    );
    boardArray.push(nextBoard);
  });

  let pgnIsValid = true;
  boardArray.forEach((board, index) => {
    if (index > 0) {
      if (
        JSON.stringify(boardArray[index]) ===
          JSON.stringify(boardArray[index - 1]) ||
        boardArray[index] === undefined
      ) {
        pgnIsValid = false;
      }
    }
  });
  if (!boardArray) {
    pgnIsValid = false;
  }
  return { boardArray, pgnIsValid };

  //----------------------------------------//
  //keeping this code to show the beauty of regExp, and what i had to do without it

  // let pgnStart;
  // let foundStart = false;
  // let commentIndexes = [];
  // let dataIndexes = [];
  // let insideOfComment = false;
  // let insidePgnData = false;
  // let commentNestCounter = 0;

  // for (let i = 0; i < pgnArray.length; i++) {
  //   //this is to find the "1." that always precedes a game, followed by a move i.e. 'e4' or 'Nf3', thus the start of the moves in the PGN, differentiating from '1.' in the date e.g. 1.12.1967 sometimes included in pgn data

  //   if (pgnArray[i] === '1' && !foundStart && !insidePgnData) {
  //     let char = pgnArray[i + 2];
  //     let code = char.charCodeAt(0);

  //     let isInLowerCaseRange = code >= 97 && code <= 104;
  //     let isN = code === 78;
  //     let isFirstMove = isInLowerCaseRange || isN;

  //     if (pgnArray[i + 1] === '.' && isFirstMove) {
  //       console.log('aarr', pgnArray[i + 2]);
  //       pgnStart = i;
  //       pgnArray.slice(i).join('');
  //       foundStart = true;
  //     }
  //   }
  //   //in PGN format, all comments are nested within {}, so this operation parses out all text inside curly braces.

  //   if (pgnArray[i] === '{') {
  //     commentIndexes.push(i);
  //     insideOfComment = true;
  //   }
  //   if (pgnArray[i] === '}') {
  //     commentIndexes.push(i);
  //     insideOfComment = false;
  //   }
  //   //PGN comments can also be nested using (). this operations records the outermost layer of comments, and later removes all text inside
  //   if (!insideOfComment) {
  //     if (pgnArray[i] === '(') {
  //       commentNestCounter++;
  //       //only push index of first parentheses
  //       if (commentNestCounter === 1) {
  //         commentIndexes.push(i);
  //       }
  //     }
  //     if (pgnArray[i] === ')') {
  //       commentNestCounter--;
  //       //only push index of last of nested parentheses
  //       if (commentNestCounter === 0) {
  //         commentIndexes.push(i);
  //       }
  //     }
  //   }
  //   //this is for the data at the beginning of some PGNs. sometimes a "1." might be included in the date and mess up the start of the pgn, so it is necessary to know where it ends and begins, and delete all text inside
  //   if (pgnArray[i] === '[') {
  //     dataIndexes.push(i);
  //     insidePgnData = true;
  //   }
  //   if (pgnArray[i] === ']') {
  //     dataIndexes.push(i);
  //     insidePgnData = false;
  //   }
  // }
  // //slice all pgn data
  // for (let i = 0; i < dataIndexes.length; i += 2) {
  //   pgnArray
  //     .slice(dataIndexes[i] + 1, dataIndexes[i + 1])
  //     .join('')
  //     .split("'");
  // }

  // //where the "1." that begins the game starts
  // commentIndexes.unshift(pgnStart - 1);

  // let noComments = [];
  // let resultStr = '';

  // //this for loop slices all text that is not inside a comment, to concat into a single string
  // for (let i = 0; i < commentIndexes.length; i += 2) {
  //   let slice = pgnArray.slice(commentIndexes[i] + 1, commentIndexes[i + 1]);
  //   let newslice = slice.join('').split('\n').join(' ');
  //   noComments.push(newslice);
  //   slice.join(',');
  //   resultStr += newslice;
  // }
  // let newResultStr = resultStr.split(' ');

  // //at this point all superflous PGN data/comments have been parsed. Now we delete all superflous items of the game moves
  // let parsedArray = [];
  // //this parses out move numbers, turning "2.Nf3" into "Nf3"
  // newResultStr.forEach(item => {
  //   let dotIndex = item.indexOf('.');
  //   if (dotIndex !== -1) {
  //     let isMoveNum = item[dotIndex + 1] === undefined;
  //     if (!isMoveNum) {
  //       item = item.slice(dotIndex + 1);
  //       if (item !== '..') {
  //         parsedArray.push(item);
  //       }
  //     }
  //   } else {
  //     parsedArray.push(item);
  //   }
  // });

  // let cleanPgn = [];
  // let comments = [
  //   '??',
  //   '!?',
  //   '!!',
  //   '?!',
  //   '?',
  //   '!',
  //   'x',
  //   '+',
  //   '#',
  //   '1-0',
  //   '1/2-1/2',
  //   '0-1',
  //   '*',
  // ];

  // //parse all superflous symbols
  // parsedArray.forEach(item => {
  //   comments.forEach(comment => {
  //     if (item.includes(comment)) {
  //       item = item.split(`${comment}`).join('');
  //     }
  //   });

  //   if (item.length !== 0) {
  //     cleanPgn.push(item);
  //   }
  // });

  //--------------------------------------------------//
};

export default PgnReader;
