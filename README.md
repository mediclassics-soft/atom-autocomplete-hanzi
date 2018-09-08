# zayo-atom-autocomplete-hanzi

A Package for hanzi autocomplete provider for Atom.

## Introduction



## Installation

Atom provides a built-in way to download and install packages, but for local development, you'll want to do it this way.

1. Clone this repo.
2. Make sure you have apm installed.
    - On Mac, you might need to start Atom and go to Atom &gt; Install Shell Commands.
    - On Windows, it's probably already there.
3. Open your terminal, navigate into the repo directory, then run `apm link`.
4. Back in Atom, you should now see atom-autocomplete-boilerplate installed.
    - On Mac, you'll find it under Atom &gt; Preferences... &gt; Packages &gt; Community Packages.
    - On Windows, you'll find it under File &gt; Settings &gt; Packages &gt; Community Packages.

Don't forget to reload Atom when you make changes!
- On Mac, hit `ctrl` + `option` + `command` + `L`.
- On Windows, hit `ctrl` + `shift` + `F5`.

## Usage

`$`를 입력하고 변환하고자 하는 단어를 입력하면 자동완성 단어들이 제시된다. 예를 들어 `$홍길동`처럼 입렵한다.

`$<`, `$>`, `$,`, `$.` 등을 입력하면 키보드에 없는 기호를 자동입력 할 수 있다.

새로 추가하고자 하는 custom data가 있다면 `/data/custom.json`에 추가하여 사용한다.

## Inspired

* [autocomplete-boilerplate](https://atom.io/packages/autocomplete-boilerplate)
