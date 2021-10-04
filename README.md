# Person

Person is a plugin which allows users to add "Person" entity in order to show the location with a beutiful integration.

## Installation

![]()

#### HACS
1. Go to the Community Store.
2. Search for Person.
3. Navigate to Person.
4. Press Install
5. Add your entities in your lovelace.yaml panel. Plugins allows to add one or more than one entity to track. See the example below:

```yaml
- type: "custom:person-entity-card"
  entities:
    - person.gerard
    - person.bar
    - person.foo
```