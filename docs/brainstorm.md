### Motivation

- easier to reason about - only have to deal with models
- models work for 99% of your cases
    - edge cases can be solved with an event bus
- encapsulates logic & model relationships
- only one concept - models
- there's a pattern to models & collections
- clearly separates models from views
- async models means you call APIs on demand
- easily flush models in certain cases - user logs out and logs back in
- models are not singletons - stores are
- follows heirarchy structure - relationships are easy to reconsile
    - heyyyy - views follow heirarchy structure - these things are like PB&J!
- easily abstract models layer - stub stuff out & build views with fake data
- models aren't tied to application implementation - they're in their own sorta bubble.
    - easily move same models to the backend
    - use models with different libraries - backbone, react, ractive, whatevs!
- better caching
- write less stuff

- actions -> methods on collections & models
- stores -> collections
- dispatcher -> event bus. Not necessary until you have relationships across different disconnected models