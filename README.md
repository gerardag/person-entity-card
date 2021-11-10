# Person

[![](https://img.shields.io/github/v/release/gerardag/person-entity-card.svg?style=flat-square)](https://github.com/gerardag/person-entity-card/releases/latest)
[![Build](https://github.com/gerardag/person-entity-card/actions/workflows/tag-and-build.yaml/badge.svg)](https://github.com/gerardag/person-entity-card/actions/workflows/tag-and-build.yaml)

Person is a plugin which allows users to add "Person" entity in order to show the location with a beautiful integration.

![Preview Image](https://user-images.githubusercontent.com/2340397/138221325-5b1c4b68-8554-4313-9fc4-a73fd2dbcf6c.jpg)

## Install

*This card is available in [HACS](https://github.com/custom-components/hacs) (Home Assistant Community Store)*

### Manual install
1. Download and copy `person-entity-card.js` from the [latest release](https://github.com/gerardag/person-entity-card/releases/latest) into your `config/www` directory.
2. Add a reference to `person-entity-card.js` inside your `ui-lovelace.yaml` or through the raw config editor interface.
  ```yaml
  resources:
    - url: /hacsfiles/person-entity-card/person-entity-card-bundle.js
      type: module
  ```

### CLI install
1. Move into your `config/www` directory
2. Download `person-entity-card.js`
  ```console
  $ wget https://github.com/gerardag/person-entity-card/releases/download/v0.5.5/person-entity-card-bundle.js
  ```
3. Add a reference to `person-entity-card.js` inside your `ui-lovelace.yaml` or through the raw config editor gui.
  ```yaml
  resources:
    - url: /hacsfiles/person-entity-card/person-entity-card-bundle.js
      type: module
  ```

## Using the card

Card options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| type | string | **required** | custom:person-entity-card
| entities | object | **required** | The entity_id from an entity or entities you want to track. |
| title | string | optional | Small title above the entities. |
| showAtHome | boolean | false | You can force to show people when they are home. |

## Example usage

You need to add the card into your view `.yaml` file. The code below shows how to use within multiple persons:

```yaml
- type: "custom:person-entity-card"
  entities:
    - person.gerard
    - person.bar
    - person.foo
```

### Advanced usage

You can force to show cards although you are at home. To do that you need to add `showAtHome` set to true in card configuration. Also, you can add a title for your cards group:

```yaml
- type: "custom:person-entity-card"
  showAtHome: true
  title: Pin Pals
  entities:
    - person.gerard
    - person.bar
    - person.foo
```

## Problems

If you are getting "Custom element doesn't exist: person-entity-card", or are running an older browser try replacing type: module with type: js in the resource reference in your ui-lovelace.yaml or in the raw config editor.

## License

This project is under the MIT license.
