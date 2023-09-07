# Dependency Graph

## Learning journey

For the task I have choosen the Chord dependency diagram. I have documented my steps and learning I took to get the things done for future reference.

## Components of Powe BI

1. Desktop application
2. Mobile applications
3. Web based Service
**Note: The website is very deficient in features and entire development will take place in web because we need debugger**

### Setting up power BI

1. Download and install Desktip application
2. Signup on the powerbi.com and create account which requires.
2.1 A work / orgenizational email account.
2.2 A non Pakistan phone number (Microsoft won't verify the Pakistan's phone numbers)
2.3 Access to domain if you want to activate admin features.
2.4 Microsoft Edge as the support website was not working on the Chrome.
3. Install NodeJS
4. Install pbiviz
5. Enable the Developer mode in PowerBi.com web
6. setup certificate

### Developing reports with power BI

1. Import data from sample data source.
2. Clean the data by transforming
3. Draw different charts from visuals section inculing maps visualizations.
4. Create data models
5. Link those models like relational databases.
**Note: The look and feel of power bi is very different from as specified in the tutorials so some times It requires some fforts to find the right menues.""

### Development of simple HTML component without data

PowerBi project struture has the following importent files

``` bash
capabilites.json
src/visual.ts
src/settings.ts
pbviz.json
```

1. `src/visual` will contain visual class with a contructor and update function.
2. initalize the necesery objexts in costructor.
3. Set HTML according to the size according to the position.
4. instead to raw HTML use element object and add HTML using javascript functions.

### Passing data to the component

1. Define `dataRoles` in `capabilites.json`file. Data kinds: `[Grouping, Measure, GroupingMeasure]`
2. Define `roleMapping` in `capabilites.json` file to define structure and constraints. Structures: `[Single, Hirarcical, Categorical, Table]`

### Develop the BarChat

Offecial microsoft tutorial

### Develop the Software dependency chart using the

Build using previous knowledge

### Adding tooltip

There are two methods either use the HTML/D3 or foolow offecial tutorial.

### Add custom properties

1. Use `objects` from `capabilites.json` to define values.
2. Define models in the code to extract the data.
3. use `FormatSettingsService` to retrive the values and reflect the values for the pane.

Example implemented: A switch button to convert the graph from colored to greyscale.