Service architecture
---
This service manages games and promotions

### Games
For games this service exposes HTTP APIs for users and admins/managers, also exposes a microservice controller for handling events or commands from other services (particularly a trigger for removing games released "from-to"). The mentioned methods are enclosed in a dedicated game module.
Game module itself consists of a game entity which is the source of truth in the company infrastructure as this entire service is made to serve/manage games and related business around it. The module also consists of a publisher entity which serves as a minimal copy of the publisher source for reducing communication between game and publisher service (assuming we have a publisher service or a service where the source of truth is being maintained), this also gives us possibility to filter/sort/search games by publishers (assuming we have such requirement).

### Promotions
It is a discount/promotion system represented as a standalone module, can also be decoupled from this game service into a standalone promotion microservice. Currently, it consists of some minimals for adding a discount to the games for users (target customers). It consists of basic event/promotion entities, which gives us possibility to arrange an event like black friday by applying a percentage discount to whole game marketplace.

Disclaimer
---
This service exceeds the requirements given in the pdf document by enhancing the implementation, although this is far from a real world POC.
