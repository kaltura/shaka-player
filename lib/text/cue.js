/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

goog.provide('shaka.text.Cue');
goog.provide('shaka.text.CueRegion');

/**
 * Creates a Cue object.
 *
 * @param {number} startTime
 * @param {number} endTime
 * @param {!string} payload
 *
 * @implements {shakaExtern.Cue}
 * @constructor
 * @struct
 * @export
 */
shaka.text.Cue = function(startTime, endTime, payload) {
  const Cue = shaka.text.Cue;

  /**
   * @override
   * @exportInterface
   */
  this.startTime = startTime;

  /**
   * @override
   * @exportInterface
   */
  this.endTime = endTime;

  /**
   * @override
   * @exportInterface
   */
  this.payload = payload;

  /**
   * @override
   * @exportInterface
   */
  this.region = new shaka.text.CueRegion();

  /**
   * @override
   * @exportInterface
   */
  this.position = null;

  /**
   * @override
   * @exportInterface
   */
  this.positionAlign = Cue.positionAlign.AUTO;

  /**
   * @override
   * @exportInterface
   */
  this.size = 100;

  /**
   * @override
   * @exportInterface
   */
  this.textAlign = Cue.textAlign.CENTER;

  /**
   * @override
   * @exportInterface
   */
  this.writingDirection = Cue.writingDirection.HORIZONTAL_LEFT_TO_RIGHT;

  /**
   * @override
   * @exportInterface
   */
  this.lineInterpretation = Cue.lineInterpretation.LINE_NUMBER;

  /**
   * @override
   * @exportInterface
   */
  this.line = null;

  /**
   * @override
   * @exportInterface
   */
  this.lineHeight = '';

  /**
   * @override
   * @exportInterface
   */
  this.lineAlign = Cue.lineAlign.CENTER;

  /**
   * @override
   * @exportInterface
   */
  this.displayAlign = Cue.displayAlign.BEFORE;

  /**
   * @override
   * @exportInterface
   */
  this.color = '';

  /**
   * @override
   * @exportInterface
   */
  this.backgroundColor = '';

  /**
   * @override
   * @exportInterface
   */
  this.fontSize = '';

  /**
   * @override
   * @exportInterface
   */
  this.fontWeight = Cue.fontWeight.NORMAL;

  /**
   * @override
   * @exportInterface
   */
  this.fontStyle = Cue.fontStyle.NORMAL;

  /**
   * @override
   * @exportInterface
   */
  this.fontFamily = '';

  /**
   * @override
   * @exportInterface
   */
  this.textDecoration = [];

  /**
   * @override
   * @exportInterface
   */
  this.wrapLine = true;

  /**
   * @override
   * @exportInterface
   */
  this.id = '';
};


/**
 * @enum {string}
 * @export
 */
shaka.text.Cue.positionAlign = {
  'LEFT': 'line-left',
  'RIGHT': 'line-right',
  'CENTER': 'center',
  'AUTO': 'auto'
};


/**
 * @enum {string}
 * @export
 */
shaka.text.Cue.textAlign = {
  'LEFT': 'left',
  'RIGHT': 'right',
  'CENTER': 'center',
  'START': 'start',
  'END': 'end'
};


/**
 * @enum {string}
 * @export
 */
shaka.text.Cue.displayAlign = {
  'BEFORE': 'before',
  'CENTER': 'center',
  'AFTER': 'after'
};


/**
 * @enum {number}
 * @export
 */
shaka.text.Cue.writingDirection = {
  'HORIZONTAL_LEFT_TO_RIGHT': 0,
  'HORIZONTAL_RIGHT_TO_LEFT': 1,
  'VERTICAL_LEFT_TO_RIGHT': 2,
  'VERTICAL_RIGHT_TO_LEFT': 3
};


/**
 * @enum {number}
 * @export
 */
shaka.text.Cue.lineInterpretation = {
  'LINE_NUMBER': 0,
  'PERCENTAGE': 1
};


/**
 * @enum {string}
 * @export
 */
shaka.text.Cue.lineAlign = {
  'CENTER': 'center',
  'START': 'start',
  'END': 'end'
};


/**
 * In CSS font weight can be a number, where 400 is normal
 * and 700 is bold. Use these values for the enum for consistency.
 * @enum {number}
 * @export
 */
shaka.text.Cue.fontWeight = {
  'NORMAL': 400,
  'BOLD': 700
};


/**
 * @enum {string}
 * @export
 */
shaka.text.Cue.fontStyle = {
  'NORMAL': 'normal',
  'ITALIC': 'italic',
  'OBLIQUE': 'oblique'
};


/**
 * @enum {string}
 * @export
 */
shaka.text.Cue.textDecoration = {
  'UNDERLINE': 'underline',
  'LINE_THROUGH': 'lineThrough',
  'OVERLINE': 'overline'
};


/**
 * Creates a CueRegion object.
 *
 * @implements {shakaExtern.CueRegion}
 * @constructor
 * @struct
 * @export
 */
shaka.text.CueRegion = function() {
  const CueRegion = shaka.text.CueRegion;

  /**
   * @override
   * @exportInterface
   */
  this.id = '';

  /**
   * @override
   * @exportInterface
   */
  this.viewportAnchorX = 0;

  /**
   * @override
   * @exportInterface
   */
  this.viewportAnchorY = 0;

  /**
   * @override
   * @exportInterface
   */
  this.regionAnchorX = 0;

  /**
   * @override
   * @exportInterface
   */
  this.regionAnchorY = 0;

  /**
   * @override
   * @exportInterface
   */
  this.width = 100;

  /**
   * @override
   * @exportInterface
   */
  this.height = 100;

  /**
   * @override
   * @exportInterface
   */
  this.heightUnits = CueRegion.units.PERCENTAGE;

  /**
   * @override
   * @exportInterface
   */
  this.widthUnits = CueRegion.units.PERCENTAGE;

  /**
   * @override
   * @exportInterface
   */
  this.viewportAnchorUnits = CueRegion.units.PERCENTAGE;

  /**
   * @override
   * @exportInterface
   */
  this.scroll = CueRegion.scrollMode.NONE;
};


/**
 * @enum {number}
 * @export
 */
shaka.text.CueRegion.units = {
  'PX': 0,
  'PERCENTAGE': 1,
  'LINES': 2
};


/**
 * @enum {string}
 * @export
 */
shaka.text.CueRegion.scrollMode = {
  'NONE': '',
  'UP': 'up'
};
