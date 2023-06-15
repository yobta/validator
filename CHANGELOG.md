# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## 0.0.42

- change validity reporting to always remove errors and set with respect to options

## 0.0.41

- fixed validity event type issue

## 0.0.37

- add mode option to validity rule
- set default mode to submit
- expect validity to fire only for submit when mode is not set

## 0.0.36

- add catch to awaitSubmitYobta

## 0.0.35

- fix boolean rule typings

## 0.0.34

- rename package to @yobta/validator

## 0.0.34

- Add file extensions to ESM imports

## 0.0.33

- Unwrap async chain

## 0.0.32

- Improve validity reporting

## 0.0.31

- Fix racing condition issue in async shape validator
- Improve error constructor

## 0.0.30

- Consistent array rule

## 0.0.29

- Number rule to strip white space

## 0.0.28

- Number rule to return NaN only for undefined

## 0.0.27

- Add non-throwing sync validator

## 0.0.26

- Fix SSR context issue

## 0.0.25

- Export Yobta error class

## 0.0.24

- Slug regular expression should allow slugs starting with a digit

## 0.0.23

- RegExp test rule should accept empty strings

## 0.0.22

- Export error reporter type

## 0.0.21

- Replace generic return type of the test rule with string

## 0.0.20

- String and number rule consistent return types
- Fix related dependencies

## 0.0.19

- Fix slug length issue
- Add regression tests

## 0.0.18

- Add regular expression for testing slugs
- Keep all expressions in src/regularExpressions

## 0.0.1 “Cy Twombly”

- Initial release.
