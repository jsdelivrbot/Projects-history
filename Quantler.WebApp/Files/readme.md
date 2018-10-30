Quantler
=====


Overview
--------
Quantler is an online algorithimc trading system development environment. Quantler makes use of the Quantler model, also explained in this document. By both leveraging the C# language and the Quantler model, developers and non-developers are given a lean stack for the realization of their trading ideas to its execution. Our goal is to provide the infrastructure, data, setup tasks and guidance in realizing your trading ideas.

*(Note: Our current release is in Beta stage. If you spot any unexpected behaviours please [Contact Support])*

### Support
In case you have questions [Contact Support].

### Intellectual Property
You, the user, own all your intellectual property and code. Your code is private by default, unless you explicitly share it with the community or on other parts of our website. We respect your valuable property, and wish to make it easier. In the event that we ever need access to your code, such as troubleshooting, we will explicitly request your permission first. 


Getting started
---------------

### Tips

- Do not start from scratch, use an existing template and modify it to learn how it works.
- Explore the basic sources for ideas and sample code.
- Use every item in the Quantler model, the parts presented are based on best practices.
- Use multiple samples when testing your trading algorithm.

### Interface

Please use the following video for more information regarding Quantler's interface:
[![Quantler Introduction](https://img.youtube.com/vi/ZfAnJkR7DZg/0.jpg)](https://www.youtube.com/watch?v=ZfAnJkR7DZg)

### Backtest Notices

When backtesting new trading algorithms, please consider the following:

- The backtester is by design tick based, which means: if no ticks are received from the [DataStream], no events will be fired.
- When selecting a timeframe, the backtester will automatically select the lowest level of data needed. Please see [Data Sources] for more info.
- Using the Quantler model is not obligatory, you can in fact write a complete algorithm in one template. However, you are advised not to.
- Quantler will only act based on the default timeframe, other timeframes (higher or lower), will not trigger an event in other templates. See the possible [events][Event].
- When sending an order in the opposite direction of your current position, Quantler will not reverse the position and will not hedge the current position either. You can however, flip your current position in one order. An example would be: I am long 100 units, I will send a sell/short order for 200 units, my new position will be -100 units or 100 units short.
- **Always take into account that past performance does not guarantee future results!**

### Data Sources
The lowest level of data available are level 1 ticks (Quotes based). A tick is each change in the market price. Since market prices can change 100 times per second, tick data needs the most resources to simulate your trading but is more accurate to real world conditions. Currently we are only offering FX (Forex/Currency) data on major pairs, going back to 2007. All data is based on UTC timestamps.

There are many other financial data sources we'd like to incorporate, such as equities and futures. What kind of data sources would you like us to have? [Let us know].

A bar is a summary of the trading activity for a security for a one-second period, and gives you the opening price, closing price, high price and low price during that second. Our datasource is point-in-time, which is important for backtest accuracy, your algorithm receives accurate historical data without any bias towards the present.

Quantler has a database of pre-aggregated data (bars) on different levels. We currently have the following timed bars available:

- Second bars: 1 second
- Minute bars: 1 minute, 5 minutes
- Hourly bars: 1 hour
- Daily bars: 1 day

To speed up the backtest process, the backtester will automatically choose a default pre-aggregration level for you. This is based on the chosen timeframe in the templates requested [datastream][DataStream], set during the initialization process. If there are multiple [datastreams][DataStream] available with mutliple timeframes, the lowest level is always taken for choosing the pre-aggregated data. This allows you to add multiple [datastreams][DataStream] and forcing a certain pre-aggregration level in your algorithms.

Examples
- Selecting a timeframe of 30 minutes will result in a datasource based on the 5 minutes level.
- Selecting a timeframe of 1 hour will result in a datasource based on the 1 hour level.
- Selecting a timeframe of 1 hour 2 minutes and 12 seconds will result in a datasource based on the 1 second level.


### Libraries
The following third-party libraries can be used for development of your trading algorithms:

**[Accord](http://accord-framework.net/) **
The Accord.NET Framework is a .NET machine learning framework combined with audio and image processing libraries completely written in C#. It is a complete framework for building production-grade computer vision, computer audition, signal processing and statistics applications. A comprehensive set of sample applications provide a fast start to get up and running quickly, and an extensive documentation and wiki helps fill in the details.

**[AForge.NET](http://www.aforgenet.com/)**
AForge.NET is a C# framework designed for developers and researchers in the fields of Computer Vision and Artificial Intelligence - image processing, neural networks, genetic algorithms, machine learning, robotics, etc.

**[ALGLIB](http://www.alglib.net/)**
ALGLIB is a cross-platform numerical analysis and data processing library. It supports several programming languages (C++, C#, Pascal, VBA) and several operating systems (Windows, Linux, Solaris). ALGLIB features include:

- Data analysis (classification/regression, including neural networks)
- Optimization and nonlinear solvers
- Interpolation and linear/nonlinear least-squares fitting
- Linear algebra (direct algorithms, EVD/SVD), direct and iterative linear solvers, Fast Fourier Transform and many other algorithms (numerical integration, ODEs, statistics, special functions)

**[Math.NET Numerics](http://numerics.mathdotnet.com/)**
Math.NET Numerics aims to provide methods and algorithms for numerical computations in science, engineering and every day use. Covered topics include special functions, linear algebra, probability models, random numbers, interpolation, integration, regression, optimization problems and more.

**[TA-LIB](http://ta-lib.org/)**
TA-Lib is an open-source software library of technical analysis indicators. The library provides about 125 functions like ADX, RSI, MACD, Stochastics, Bollinger Bands, candlestick pattern recognition.



### Live Trading
Quantler is compatible with any broker that is using Metatrader 4 as its backend. To enable live trading, please go to the Accounts section via the left menu. Here you can either choose for a free version in which the selection of brokers is limited or a paid version where all compatible brokers can be selected.

You can always manually intervene on your trading. For example, closing a position manually will automatically sync this with your trading algorithm. This way you can use any of the native MT4 applications for when you are on the road:

Apple iPhone: [Download](https://itunes.apple.com/nl/app/metatrader-4/id496212596?mt=8)
Android Apps: [Download](https://play.google.com/store/apps/details?id=net.metaquotes.metatrader4)


####Charts
While performing live trading, templates can define charts on any data that is needed. These charts will be presented on the live trading management dashboard and a smaller selection on the general dashboard. 

```c#
UpdateChart("EMAFAST", ChartType.Line, emafast.Result.CurrentValue);
```

In the example above we create a chart label for using the following properties:


- `"EMAFAST"`: Name of the chart
- `ChartType.Line`: Chart type to use for this data (can be Line, Bar or Step)
- `emafast.Result.CurrentValue`: Value to be added to the chart


####Logging
During live trading, you can log up to 10 kilobytes of logging data per day. This is done via the following trading agent method:

```c#
	Agent.Log(LogSeverity.Debug, "Hello {0}", "World!");
```

In the example above we have pushed the following log event "Hello World!":

- `LogSeverity`: Severity level of the logged message (Debug, Info, Error)
- `Hello {0}`: We set the text of the error message with a parameter number 0
- `World!`: We replace the value {0} with any object we have set here, which is currently the word "World!"

Logging messages will be stored and can be retrieved via the live trading management interface.

The Quantler model
-----------
The Quantler model is designed to create, test and evaluate new trading ideas faster, more flexible and more easily. Developers as well as non-developers can use the model to create or generate new trading algorithms by combining existing and new templates. Each template contains domain specific knowledge and represent your trading ideas. Programming is optional when reusing existing templates. The Quantler model is based on best practices for creating trading algorithms and is further explained in this section.

### Structure
The Quantler model consists of 5 parts that are the step stones for creating a trading algorithm. Each part has its own responsibility in the trading process. In IT this concept is called [separation of concerns], for your trading algorithm it results in a modular way of developing and realizing new trading algorithms.

![Quantler Model](https://app.quantler.com/Art/Images/documentation/Quantler%20Model.png)

### Template
A template is a subsystem of your trading algorithm. Trading algorithms in Quantler consists of multiple templates which strengthen each other during strategy execution. A template contains code, parameters and documentation. Each template has it its own responsibility within an algorithm.

Each template contains the following properties directly accessible:

- `Agent :Agent`: Returns the [agent][Agent] object this template belongs to
- `Bars :BarIndexer`: Returns an object which you use to easily search for bars on different timeframes and different symbols
- `Portfolio :Portfolio`: Returns the [portfolio][Portfolio] this agent is using
- `CurrentBar[string symbol] :Bar`: Returns the current [bar][Bar] based on the supplied symbol name (latest closed bar)
- `CurrentTick[string symbol] :Tick`: Returns the current [tick][Tick] based on the supplied symbol name (latest tick received)
- `Name :string`: Returns the name of the current template
- `Id :int`: Template unique id
- `Indicators`: Factory for creating indicators

Functions:

- Data Related
 - `AddStream(SecurityType type, string name)`: Add another [datastream][DataStream] programmatically based on the security type (currently Forex only, SecurityType.Forex), the name of the security without giving an interval of data (no bars are created).
 - `AddStream(SecurityType type, string name, int interval)`: Add another [datastream][DataStream] programmatically based on the security type (currently Forex only, SecurityType.Forex), the name of the security and the interval in a timespan format (for which bars are created).
  - `AddStream(SecurityType type, string name, BarInterval interval)`: Add another [datastream][DataStream] programmatically based on the security type (currently Forex only, SecurityType.Forex), the name of the security and the interval in a BarInterval format (for which bars are created).
 - `AddStream(SecurityType type, string Name, TimeSpan Interval)`: Add another [datastream][DataStream] programmatically based on the security type (currently Forex only, SecurityType.Forex), the name of the security and the interval in a timespan format (for which bars are created).
- Dashboard charts
	- `UpdateChart(string name, ChartType type, decimal value)`: Update a [dashboard chart][Charts] using a decimal value with a given name
 	- `UpdateChart(string name, ChartType type, double value)`: Update a [dashboard chart][Charts] using a double value with a given name
  	- `UpdateChart(string name, ChartType type, int value)`: Update a [dashboard chart][Charts] using an integer value with a given name
  	- `UpdateChart(string name, ChartType type, float value)`: Update a [dashboard chart][Charts] using a float value with a given name
- Creating pending orders
	- `CreateOrder(string symbol, Direction direction, double quantity, double limitPrice, string comment = "") :PendingOrder`: Create a pending order object, based on settings provided, ready to be send.
	- `LimitOrder(string symbol, Direction direction, double quantity, double limitPrice, string comment = "") :PendingOrder`: Create a pending limit order object, ready to be send.
	- `MarketOrder(string symbol, Direction direction, double quantity, string comment = "") :PendingOrder`: Create a pending market order object, ready to be send.
	- `StopLimitOrder(string symbol, Direction direction, double quantity, string comment = "") :PendingOrder`: Create a pending stop limit order object, ready to be send.
	- `StopOrder(string symbol, Direction direction, double quantity, double stopPrice, string comment = "") :PendingOrder`: Create a pending stop order object, ready to be send.
	- `SubmitOrder(PendingOrder pendingorder) :StatusType`: Submit a pending order to the broker (for custom order sending)

#### Agent
The agent is a template that combines and routes all decisions made by the other 4 [templates][Template]. For instance, if an entry template determines that is time to enter the markets, the agent is then responsible for executing the order and consult with your [portfolio][Portfolio].

The agent contains the following properties:

- `AgentId :int`: , also used for tracking orders (which positions/orders belong to which agent)
- `Bars :BarIndexer`: Returns an object which you use to easily search for bars on different timeframes and different symbols
- `CurrentBar[string symbol] :Bar`: Returns the current [bar][Bar] for a given symbol
- `CurrentTick[string symbol] :Tick`: Returns the current [tick][Tick] for a given symbol
- `Stream :DataStream`: Returns the default [datastream][DataStream] used by this agent
- `Timeframe :TimeSpan`: Returns the default timeframe used by this agent each OnCalculate events are executed based on this default timeframe
- `Symbol :string`: Name of the default symbol used by this agent
- `Name :string`: Name of this trading agent
- `StartedDTUTC :DateTime`: Date and time on which this trading agent was started
- `Results :Result`: Trading agent performance [results][Results], updated on each filled trade
- `PendingOrders :PendingOrder[]`: All pending orders that belong to this trading agent
- `Positions :IPositionTracker`: Positions that belong to this agent (makes trading multiple agents on the same symbol possible)
- `Security :ISecurity`: Associated default security for this trading agent
- `IsBacktesting :bool`: True if the trading agent is currently in a backtest state
- `IsRunning :bool`: True if the trading agent is running (either a backtest or trading state)
- `Portfolio :Portfolio`: Returns the [portfolio][Portfolio] where this agent is part of
- `Templates :List<Template>`: Returns the list of [templates][Template] that this agent is using, including any paramaters defined and set

An agent can have different states, where a state is the result of the calculations performed by the templates. If, for instance, all entry templates send an `EnterLong()` signal, the current state for this agent will be set at `EntryLong`. The following states are applicable, depending on the actions performed by the templates:

##### AgentState
- `EntryLong`: The agent will initiate a buy order
- `EntryShort`: The agent will initiate a sell order
- `ExitLong`: The agent will create an exit order, based on the current long position (if currently Long)
- `ExitShort`: The agent will create an exit order, based on the current short position (if currently Short)
- `Flatten`: The agent will create an exit order, based whatever the current position is (either long or short)
- `NoEntry`: All other states, defined by other entry templates, are ignored (we are not allowed to go long)

#### Entry
The entry [template][Template] determines based on what logic an entry should be made. Entry templates send this information to the [agent][Agent] that will in turn execute the order and consult with the Risk Management template, the Money Management template and your [portfolio][Portfolio].

The following method is suggested to be implemented:

- `public override void Initialize()` - Executed once before starting the backtest or algorithm.

The following method is obligatory to be implemented:

- `public override void OnCalculate()` - Executed on each change event for the default timeframe of the [agent][Agent]. Entry and exit decisions should be implemented here.

Orders are passed to the agent through the following methods:

- `EnterLong()`   - Will send a message to the agent to enter the markets long (Buy). Using the agents default symbol.
- `EnterShort()`  - Will send a message to the agent to enter the markets short (Sell). Using the agents default symbol.
- `NoEntry()`     - Will send a message to the agent to not enter the markets. Using the agents default symbol.
- `Flatten()`     - Will send a message to the agent to flatten currently held positions. Using the agents default symbol.
- `EnterLong(string Symbol)`   - Will send a message to the agent to enter the markets long (Buy). Using the symbol provided, a [datastream][DataStream] should be active for the symbol.
- `EnterShort(string Symbol)`  - Will send a message to the agent to enter the markets short (Sell). Using the symbol provided, a [datastream][DataStream] should be active for the symbol.
- `NoEntry(string Symbol)`     - Will send a message to the agent to not enter the markets. Using the symbol provided, a [datastream][DataStream] should be active for the symbol.
- `Flatten(string Symbol)`     - Will send a message to the agent to flatten currently held positions. Using the symbol provided, a [datastream][DataStream] should be active for the symbol.

Since you can have up to 3 entry templates in place for deciding your entry, the agent will evaluate all of the signals received. The agent will only enter the markets if **1**. All signals received are either `EnterLong()` or `EnterShort()` and **2**. there is no `NoEntry()` signal available. A request to flatten the position is always executed.

Order flow for an entry order (RM = Risk Management, MM = Money Management):
```sequence
Entry->Agent: EnterLong()
Agent->RM: IsTradingAllowed()
RM->Agent: True
Agent->RM: RiskManagement(Order currentorder, AgentState state)
RM->Agent: Modified/Additional Order
Agent-->Entry: OnOrder(Stop Order)
Agent->MM: PositionSize(Order order, AgentState state)
MM->Agent: Modified Order
Agent-->Entry: OnOrder(Entry Order)
```

#### Risk Management
Risk Management templates are used for managing risk by modifying or cancelling the trading strategies orders. Extra orders can be created to manage risks of current orders, such as a stop order.

The following methods are suggested to be implemented:

- `public override bool IsTradingAllowed()`     - Executed on each order attempt, returning false will deny any order execution.
- `public PendingOrder RiskManagement(PendingOrder pendingOrder, AgentState state)`  - Receives the current order being made, allows for adapting the order and can also send back a new order (stop order). The current agents state is expressed via the state object (AgentState).

Each agent can contain a maximum of 1 risk management template.

#### Money Management
Money management templates are used to override the quantity of an entry order. By seperating money management from entry templates, you can test the impact of various position sizing strategies on a trading system's performance. *(Note: Money management templates are not used by Quantler's [Auto Discovery Service])*

The following method is suggested to be implemented:

- `public void PositionSize(PendingOrder order, AgentState state)`     - Executed on each trade attempt, the order size can be modified. The current agent state is send as well to determine if a position size needs to be calculated.

Each agent can contain a maximum of 1 money management template.

#### Exit
The exit template determines based on what logic an exit should be made. Exit templates send this information to the agent that will in turn execute the order and consult with the Risk Management template, the Money Management template and your portfolio.

The following method is suggested to be implemented:

- `public override void Initialize()` - Executed once before starting the backtest or algorithm.

The following method is obligatory to be implemented:

- `public override void OnCalculate()` - Executed on each change event for the default timeframe of the agent. Entry and exit decisions should be implemented here.

Orders are passed to the agent through the following methods:

- `ExitLong()`    - Will send a message to the agent to exit the markets if there is a position long. Using the default agent symbol.
- `ExitShort()`   - Will send a message to the agent to exit the markets if there is a position short. Using the default agent symbol.
- `Flatten()`     - Will send a message to the agent to flatten currently held positions regardless of direction. Using the default agent symbol.
- `ExitLong(string Symbol)`    - Will send a message to the agent to exit the markets if there is a position long. Using the default agent symbol. Using the symbol provided, a [datastream][DataStream] should be active for the symbol.
- `ExitShort(string Symbol)`   - Will send a message to the agent to exit the markets if there is a position short. Using the symbol provided, a [datastream][DataStream] should be active for the symbol.
- `Flatten(string Symbol)`     - Will send a message to the agent to flatten currently held positions regardless of direction. Using the symbol provided, a [datastream][DataStream] should be active for the symbol.

Each agent can have a maximum of 3 exit templates. The agent will process any of the signals given, it will **not** consult with other exit templates. Default, all exit decisions result in an order to flatten the current position. Money management templates can change the exit order size.

*(Note: Both Risk Management and Money Management templates are consulted when performing an exit order. This can be used for scaling out of a position and when managing multiple symbols)*

Order flow for an exit order (RM = Risk Management, MM = Money Management):
```sequence
Exit->Agent: ExitLong()
Agent->RM: IsTradingAllowed()
RM->Agent: True
Agent->RM: RiskManagement(Order currentorder, AgentState state)
RM->Agent: Modified/Additional Order
Agent-->Exit: OnOrder(Stop Order)
Agent->MM: PositionSize(Order order, AgentState state)
MM->Agent: Modified Order
Agent-->Exit: OnOrder(Exit Order)
```

### Parameters
A template can consist of none or multiple parameters. The creation of these parameters is done programmatically. The assigning and changing of the values of these algorithms can be done through either user input or machine input (such as the [Auto Discovery Service]).

An example of setting a parameter:

```c#
    // A comment above the parameter will be used as documentation in the interface, adding no comment will result in no documentation.
    [Parameter(20, 40, 10, "SlowEMA")]
    public int slowperiod { get; set; }
    
    [Parameter(5, 15, 5, "FastEMA")]
    public int fastperiod { get; set; }
```

In the example above we have set two different parameters for this template. An explanation on each of the parameters:

- `Comment`: Adding a comment above a parameter is not only useful within the code, the comment will also be used as documentation in the user interface. Adding no comment will result in no documentation, therefore this value is optional.
- `[Parameter(20, 40, 10, "SlowEMA")]`: In this example we are telling Quantler that the value underneath this statement a variable (propertie) that can be altered. A parameter consist of the following fixed values (min, max, increment, name). Putting these values in the wrong order, will make this parameter useless.
	- `Min :int`: The minimum value for this parameter, in this case `20`
	- `Max :int`: The maximum value for this parameter, in this case `40`
	- `Increment :int`: The value at which this parameter should increase, (steps). In this case `10`
	- `Name :string`: The name of this parameter for documentation and further references. In this case `SlowEMA`
- `public int slowperiod { get; set; }`: The variable used for this parameter should always be a propertie with a public getter and a public setter

### Auto Discovery Service
Due to the fact that algorithms are created using templates, Quantler can take your templates and create new trading algorithms automatically. Only the templates you own are used in the discovery process. The current process of achieving this is roughly explained below:

1. Looks at your templates and checks which templates have a positive influence on each other. (using a genetic search algorithm)
2. Generates a new trading algorithm based on these templates, will not touch any parameters.
3. Takes one of the predefined samples, only looks for IN samples.
4. Backtests the resulting algorithm.
5. Stores the results and sends this results periodically via email.

The resulting trading algorithms can be checked and tested on different samples for further analyses. You will receive discovery updates via email, however the auto discovery service will not work in the following circumstances:

- The email the user uses is invalid. This includes the following situations:
	- The email format is incorrect
	- The email is registered at a disposable service
	- No user email is provided or known
- The user needs to be logged in at least once a month, if this is not the case, the auto disovery service will be automatically turned off
- The user has decided to turn off the auto discovery service, via the account settings



### Samples
Quantler allows you to create new samples used for backtesting and the [Auto Discovery Service]. On the Samples section you can navigate to find details about existing samples and add new samples.

#### Why samples?
The reason the creation of samples was implemented separately from the trading algorithm is because of the following reasons:

- It allows you to test new trading algorithms faster, as you do not have to edit any code when switching data.
- Those who cannot program can use templates on different samples.
- Forces you to think about segregating time periods in different samples (best practice).
- Allows the [Auto Discovery Service] to search for new trading algorithms on predefined datasets.

#### Adding a new sample
A new sample can be made via the web-interface by clicking the "samples" menu item for any of the symbols made available for backtesting.

Currently active symbols:
- AUD/JPY
- AUD/USD
- EUR/JPY
- EUR/USD
- GBP/JPY
- GBP/USD
- NZD/USD
- USD/CAD
- USD/CHF
- USD/JPY
- EUR/CHF

API Documentation
-----------
The following section explains methods, events and objects use able when creating your templates.

### Events
The following events can be used in any of the templates that you are developing.

Example of accessing an event in a template:

```c#
    public void OnBar(Bar bar)
    {
        //Get the close of this current bar if it is the default symbol
        if(bar.Symbol == Agent.Symbol)
            var close = bar.Close;
    }
```

All available events to subscribe to:

- `OnBar(Bar bar)`    - Each [bar][Bar] completion event within the agent. Based on the subscribed [DataStream][DataStream]. Agent.CurrentBar[string Symbol] allows you to return other bars as well
- `OnTick(Tick tick)` - Each [tick][Tick] event within the agent. Based on the subscribed [DataStream][DataStream]. Agent.CurrentTick[string Symbol] allows you to return other ticks as well
- `OnFill(Trade trade, PendingOrder order)` - Each filled order update event, the trade (executed order) and the order (pending order)
- `OnOrder(PendingOrder order)` - Each new pending order event, after templates have processed the order (Money Management and Risk Management templates)
- `OnOrderUpdate(PendingOrder order)` - Each time the status or values are updated on a pending order

### Data object properties
The following data objects are exposed.

#### Bar
A representation of aggregated data in a point in time. Containing the following properties:

- `Bardate :int`: Date of the bar, expressed as year month day - 20151231
- `BarDateTime :DateTime`: Bar date and time
- `BarInterval :BarInterval`: Type of bar interval amount
- `Bartime :int`: Time of the bar, expressed as hour minutes seconds milliseconds - 161259100
- `Open :decimal`: Open price of the bar
- `High :decimal`: High price of the bar
- `Low :decimal`: Low price of the bar
- `Close :decimal`: Close price of the bar
- `Interval :int`: Interval used for creating this bar in integer format in seconds - 3600 = 1 hour
- `Id :long`: Unique bar id
- `IsNew :bool`: True if this is a new bar or a closed bar
- `IsValid :bool`: Checks if this is a valid bar
- `Symbol :string`: Returns the symbol name for this bar
- `Volume :long`: Returns the volume traded during the bar's timespan, in FX is always fixed on a large amount
- `Time :int`: Time the bar was created in the [datastream][DataStream]
- `BarDateTime :DateTime`: Current bar date and time in a DateTime object

#### BarList
A historical list of multiple bars. Containing the following properties:

- `Count :int`: count of all bars
- `isValid :bool`: True if bar has symbol and some data
- `symbol :string`: The symbol this barlist contains data of
- `this[int index] :Bar`: get a [bar][Bar] from list using it's index. index = 0 is oldest bar. index = Last is newest bar. index = -1 is one bar back. index = -5 is 5 bars back

#### Direction
The following directions can be used for the Direction Enumerator:

-  `Direction.Long`: Known as the buy direction
-  `Direction.Short`: Known as the sell direction
-  `Direction.Flatten`: Only applicable when sending a new order, this will set the order size equal to the flatsize of the current position of the orders symbol

#### Tick
The smallest change in the markt. Containing the following properties:

- `Ask :decimal`: Current tick ask price
- `AskExchange :string`: Offer exchange
- `AskSize :int`: Current tick ask size
- `Bid :decimal`: Current tick bid price
- `BidExchange :string`: Bid exchange
- `BidSize :int`: Current tick bid size
- `Date :int`: Date in integer, expressed as year month day - 20151231
- `DateTime :long`: Date and time represented as long, eg 8:05.150pm on 4th of July: 200907042005150. this is not guaranteed to be set.
- `Depth :int`: Depth of last bid/ask quote
- `Exchange :string`: Trade exchange
- `IsValid :bool`: True if this tick contains valid information (no inconsistencies)
- `Symbol :string`: Symbol in string format
- `TickDateTime :DateTime`: Converted tik date and time into DateTime format
- `Time :int`: Tick time in HHmmssfff format (4:59:12.000pm = 165912000)

#### PendingOrder
A pendingorder object is a container object for an order that has not been executed yet at the broker. This allows for editing or canceling the order before it is being executed. This object contains the following properties:

- `Account :IAccount`: Account object on which this order will be executed
- `AgentId :int`: Order ownerid
- `IsCancelled :bool`: Value is true if the order is cancelled by the algorithm or by the broker
- `OrderId :long`: Order ID for the underlying order, as provided by the broker
- `OrderStatus :StatusType`: Current order status, if this value changes an order update event will be sent to templates that have subscribed for order update events.
- `Order :Order`: Order object that this pending order references to

#### Order
An order to buy or sell a certain amount of a symbol (currency or share). Containing the following properties:

- `AccountName :string`: Unique name for the account on which this order will be executed against
- `AgentId :int`: Owner/originator of this order
- `BrokerSymbol :string`: Symbol name as defined at the broker (can be different from internal naming)
- `Comment :string`: Order comment
- `Created :DateTime`: Get the order created date and time object
- `Commission :decimal`: Commissions paid for this order
- `Direction :Direction`: Direction of the order either Buy or Sell
- `Exchange :string`: Name of the exchange on which this order will be executed on
- `Id :long`: Unique order id
- `IsFilled :bool`: Is true when this order is successfully filled
- `IsValid :bool`: Whether order is valid or not
- `LimitPrice :decimal`: The limit price set for this order
- `LotSize :int`: Current lotsize for this order
- `Quantity :int`: Order size in quantity according to lotsize, (1 = 1 microlot = 1000 in size)
- `Security :ISecurity`: Security object associated for this order, the order will be executed on this security
- `Size :int`: Order size in integer value (1 microlot == 1000 in size).
- `StopPrice :decimal`: Stop price set for this order
- `Symbol :string`: Symbol name within Quantler, may differ from name on brokers end
- `Type :OrderType`: Current order type, based on the properties set
- `UnsignedSize :int`: Unsigned size of order
- `ValidInstruct :OrderInstructionType`: Order instruction (GTC, DAY, MOC, OPG, IOC, HIDDEN) - Currently only GTC is implemented

#### Trade
A filled order in the market, partially or fully filled. Containing the following properties:

- `Account :IAccount`: Full object on which this order was executed on
- `AccountName :string`: Name of the account this trade was executed on
- `AgentId :int`: AgentID for the agent on which this trade was executed on
- `BrokerSymbol :string`: Broker symbol
- `Commission :decimal`: Commissions known from execution of this order
- `Currency :CurrencyType`: Base currency of the account on which this order will be calculated on  (PnL calculations)
- `Direction :Direction`: Direction of this trade, either Long or Short
- `Exchange :string`: Exchange/destination where trade occured
- `Executed :DateTime`: Executed date and time
- `Id :long`: Unique id of the trade made
- `IsFilled :bool`: Whether or not this trade has been filled
- `IsValid :bool`: Whether trade is valid
- `Security :ISecurity`: Security object on which this order was executed on
- `Swap :decimal`: Swap paid for this trade
- `Symbol :string`: Symbol name traded
- `UnsignedSize :int`: Unsigned size of trade
- `Xdate :int`: Executed date in integer expression "YYYYMMDD" - 20151231
- `Xtime :int`: Executed time in integer, HHmmssfff format (4:59:12.000pm = 165912000)
- `Xprice :decimal`: Executed price
- `Xsize :int`: Executed size
- `Xquantity :decimal`: Executed quantity

### ISecurity
A symbol/asset you can trade on (currently only FX is supported). Containing the following properties:

- `Ask :decimal`: Get the latest ask price
- `Bid :decimal`: Get the latest bid price
- `BrokerName :string`: Name of this security at the broker
- `DestEx :string`: Exchange associated with security
- `Details :string`: Details associated with security
- `Digits :int`: Current security amount of digits
- `IsFloatingSpread :bool`: Floating or fixed spreads
- `IsValid :bool`: Whether security is valid
- `LastTickEvent :DateTime`: Last time this security received data
- `LotSize :int`: Returns the size of a full lot
- `Name :string`: Symbol name
- `OrderMinQuantity :decimal`: Returns the minimum quantity for an order (0.01 for microlots and 0.10 for mini lots)
- `OrderMinSize :int`: Returns the minimum size for an order
- `OrderStepQuantity :decimal`: Returns the step quantity (0.01 for microlots and 0.10 for mini lots)
- `OrderStepSize :int`: Returns the step size (1.000 for microlots and 10.000 for mini lots)
- `PipSize :decimal`: Returns the size of the price for one pip
- `PipValue :decimal`: Current Pip Value using the current account currency (USD)
- `Spread :int`: Current spread in pips
- `TickSize :decimal`: The minimum price movement for this security.
- `Type :SecurityType`: Security type, currently only Forex supported

### Portfolio
The portfolio can always be accessed from within a template. It contains aggregated information, such as your [Account], [DataStreams][DataStream], [Positions], [Associated Agents], [Indicators] and [current performance].

Within Quantler a portfolio is not a basket of assets you trade, instead it is a basket of agents you have active. The agents within the portfolio are trading the assets. Currently only 1 agent in your portfolio is allowed, in the future you would be able to add as many agents as you wish.

Several examples on how you can access the portfolio from a template.

```c#
    public override void OnCalculate()
    {
        //Get the agents portfolio
        var portfolio = Portfolio;

        //Same reference
        portfolio = Agent.Portfolio;

        //Get Account
        var account = portfolio.Account;
    }
```


The returning Portfolio object will provide you with the following properties:

- `Account :IAccount`: Returns the current attached account object containing current account information.
- `Agents :Agent[]`: List of associated agents used within this portfolio
- `Id :int`: Unique identifier for this portfolio of agents
- `IsValid :bool`: Check if this portfolio object is valid for use, or not
- `PendingOrders :PendingOrder[]`: List of all currently pending orders from all trading agents, present at the broker
- `Positions :IPositionTracker`: Current opened positions and its status for this portfolio
- `Results :Result`: Updated results of this trading session, for this portfolio
- `Securities :ISecurityTracker`:  All subscribed securities
- `Streams :Dictionary<string, DataStream>`: Currently associated datastreams (live or backtest based)

### Position
Current positions can be accessed from the agent via the portfolio object `Portfolio.Positions[string Symbol]`. An example for accessing this information is shown below:

```c#
    public override void OnCalculate()
    {
        //Get the current postion on the default symbol for this agent and return the average price of this position
        decimal avgPrice = Portfolio.Positions[Agent.Symbol].AvgPrice;

        //Get the current position of another symbol and get the average price
        avgPrice = Portfolio.Positions["AUDJPY"].AvgPrice;
    }
```

The returning position object will provide you with the following properties:

- `Account :IAccount`: Account object at which this position is held at
- `AvgPrice :decimal`: The average price of the current position
- `Direction :Direction`: Current position direction information
- `FlatQuantity :decimal`: Quantity needed for flattening this position (either negative or positive)
- `FlatSize :int`: The size needed to flatten this position
-`GrossPnL :decimal`: Current position Gross PnL
- `IsFlat :bool`:  True if the current position is flat
- `IsLong :bool`: True if the current position is long (size > 0)
- `IsShort :bool`: True if the current position is short (size < 0)
- `IsValid :bool`: Checks if the postion is valid and can be used for processing
- `LastModified :DateTime`: Last time and date this position has been modified
- `NetPnL :decimal`: Net PnL (GrossPnL - Commissions - Swaps)
- `Quantity :int`: Position size expressed in lotsize quantity
- `Security :ISecurity`: Security object associated with this position
- `Size :int`: Size of the current position (negative is short, positive is long)
- `TotalCommission :decimal`: Total amount of commissions paid for this position
- `TotalSwap :decimal`: Total amount of swap paid for this position
- `Trades: Trade[]`: Trades that make up the current position
- `UnsignedSize :int`: The absolute size of the current position (either 0 or > 0)

### IAccount
The account object is a reference to the account at which the trading strategie is executed at. The account information is updated on each [tick][Tick].

Accessing the account can be done from any template you create, as an example below:

```c#
    public override void OnCalculate()
    {
        //Get Account
        var account = Portfolio.Account;

        //Flatten all positions if we have a 3% loss on the account balance
        if (account.Equity < (account.Balance * .97M))
            Flatten();
    }
```

The account object contains the following information:

- `Balance :decimal`: Current balance of the account. Currently, this value cannot be changed, all accounts start with an initial account balance of 10,000.00 when running a backtest
- `Client :string`: Client name shown on the brokers account
- `Company :string`: Company name of the broker this account is linked to
- `Currency :CurrencyType`: The account base currency, currently set at USD. This cannot be changed.
- `Equity :decimal`:  Currently available equity for this account
- `FloatingPnL :decimal`:  Currently available equity for this account
- `FreeMargin :decimal`: Currently available margin for this account
- `Id :string`: Current account id
- `IsLiveTrading :bool`: True if this account is used for live trading (real money account)
- `IsTradingAllowed :bool`: True if this account is allowed to initiate trades
- `Latency :int`: Latency from this server measured in Milliseconds
- `Leverage :int`: Leverage used 100 == 1:00
- `Margin :decimal`: Current margin
- `MarginLevel :decimal`: Ratio between free margin and account equity
- `Positions :IPositionTracker`: Currently held positions on this account
- `Securities :ISecurityTracker`: Securities associated and thus tradeable on this account.
- `Server :string`: Name of the server
- `StopOutLevel :decimal`: Returns the stop out level for this account

### DataStreams
A datastream is an object that contains data for 1 symbol. Based on data received, the datastream will create [bars][Bar] based on each of the intervals supplied to it. The [portfolio][Portfolio] can contain multiple datastreams where each datastream can be assigned to multiple [agents][Agent]. Each agent in turn receives updates either on a [tick][Tick] basis and/or each bar for each interval created on the datastream. This depends on the subscribed [events][Event] of the agents templates.

Intervals can be added programmatically to a datastream, but only during initialization of the trading algorithm. You thus cannot add or remove intervals and or datastreams during execution. A datastream and its timeframe is unique troughout your portfolio, this means that adding a datastream twice is allowed and will not create a duplicate. An example of programmatically adding a datastream is shown below:

```c#
    public override void Initialize()
    {
        //Get the current stream assigned to this agent
        var currentstream = Agent.Stream;

        //Adding another timeframe to the datastream which is twice as high as the current timeframe
        currentstream.AddInterval(currentstream.DefaultInterval.TotalSeconds * 2);

        //Also adding the daily interval
        currentstream.AddInterval(TimeSpan.FromDays(1));

        //Adding another DataStream alongside the existing datastream with a barsize of 15 minutes
        AddStream(SecurityType.Forex, "AUDJPY", TimeSpan.FromMinutes(15));
    }

    public override void OnCalculate()
    {
        //Get the AUDJPY datastream with a barsize of 15 minutes
        var additionalstream = Portfolio.Streams["AUDJPY"][TimeSpan.FromMinutes(15)];

        //Check if we have enough bars to execute the following code
        if (additionalstream.Count > 3)
        {
            //Shortcut for the currentbar
            var lastclosed = Agent.CurrentBar["AUDJPY"];
            var currenttick = Agent.CurrentTick["AUDJPY"];

            //Portfolio.Streams[Symbol][TimeFrame][index]
            var openedbar = Portfolio.Streams["AUDJPY"][TimeSpan.FromMinutes(15)].RecentBar;
            var lastclosed2 = Portfolio.Streams["AUDJPY"][TimeSpan.FromMinutes(15)][-1];
            var previousbar = Portfolio.Streams["AUDJPY"][TimeSpan.FromMinutes(15)][-2];
        }
    }
```

In the example above we added another DataStream alongside the current DataStream existing in this [agent][Agent]. Please take note of the following distinction:

- `Agent.Stream :DataStream` = The default datastream for this agent
- `Portfolio.Streams :DataStream[]` = All datastreams for this portfolio

During the `OnCalculate` function we can request the actual bars created, the following requests were made:

- `Agent.CurrentBar["AUDJPY"] :Bar`: Will request the last closed bar for this symbol, calculated on the most recent timeframe, see [Bar] properties to check the timeframe of the bar
- `Agent.CurrentTick["AUDJPY"] :Tick`: Will request the last tick received for this symbol
- `Portfolio.Streams["AUDJPY"][TimeSpan.FromMinutes(15)].RecentBar :Bar` = the currentbar, for the AUDJPY for the given specific timeframe, this is the currently open [bar][Bar] and not a closed [bar][Bar], yet
- `Portfolio.Streams["AUDJPY"][TimeSpan.FromMinutes(15)][-1] :Bar`= the previous closed [bar][Bar],  for the AUDJPY for the given specific timeframe
- `Portfolio.Streams["AUDJPY"][TimeSpan.FromMinutes(15)][-2] :Bar`= 2nd previous closed [bar][Bar],  for the AUDJPY for the given specific timeframe

The datastream contains the following properties:

- `ID :int`: Unique identifier for this datastream
- `Intervals :int[]`: Currently defined intervals in seconds 3600 = 1 hour
- `DefaultInterval :int`: The default interval for this datastream
- `this[int interval]`: Returns a [Barlist] for this datastream
- `Security :Security`: Returns the [Security] associated to this datastream

Functions:

- `AddInterval(int interval)`: Add another interval to this datastream with an interval in seconds 3600 = 1 hour
- `AddInterval(int[] intervals`: Add multiple intervals at the same time
- `AddInterval(TimeSpan interval)`: Add an interval based on a TimeSpan object, example = TimeSpan.FromMinutes(15)

### Orders
At Quantler we support many different order types. Currently, all of the order types we offer are compatible with the brokers we are connected to.

Below you can find examples of creating pending order objects.

```c#
public void OrderExamples()
{
	//Creating various orders
	
	// New market order
	var newMOrder = MarketOrder("EURUSD", Direction.Long, 0.01, "Going Long");
	
	// Short limit order, placed under the 80% below the current bid price
	var newLOrder = LimitOrder(Agent.Symbol, Direction.Short, 120, CurrentTick[Agent.Symbol] * .80);
	
	// New stop order, placed based on the low price, 10 bars back, using the agents default timeframe
	var newSOrder = StopOrder(Agent.Symbol, Direction.Long, 100, Bars[Agent.Symbol, Agent.Stream.DefaultInterval, -10].Low);
	
	// Market order processing (submit right away, before executing the next line of code) -- does not use the MM and RM templates
	var status = SubmitOrder(newMOrder);
	
	// Notify the result of this order
	if (status == StatusType.ORDER_FILLED || status == StatusType.ORDER_PARTIALFILL)
	   Agent.Log(LogSeverity.Info, "Order {0} was filled ok!", newMOrder.OrderId);

    // Update order (processed right away)
    newLOrder.Update(x => x.LimitPrice = CurrentBar[Agent.Symbol].Low - 0.005);
}
```


### Indicators
Indicators can be used either from pre-installed indicators, or by creating new indicators via the indicator [template][Template] type. All defined indicators in an agent are stored in the [portfolio][Portfolio]. This ensures that an indicator stays unique and duplicate calculations will not occure throughout the portfolio.

Quantler makes extensive use of [TA-Lib] in order to calculate indicator values. Pre-Installed indicators can be accessed from any template by using the `Indicators` object, see example below.

#### Example Usage
An example of assigning an already implemented indicator is shown below:

```c#
	//Variable for setting the Simple Moving Average
    SimpleMovingAverage sma = null;

	//Runs only once, initializing the agent
    public override void Initialize()
    {
        //initialize
        sma = Indicators.SimpleMovingAverage(20, Agent.Stream, TimeSpan.FromMinutes(15), comp => (comp.High + comp.Low) / 2);
    }

	//Runs on every change of the default timeframe for the default symbol
    public override void OnCalculate()
    {
        if (sma.IsReady)
            bool bullish = sma.Result.IsRising;
    }
```

The above example will create a new [SimpleMovingAverage][Simple Moving Average] indicator with the following settings:

- `20`: the period at which the indicator should be calculated at, in this case the past 20 values should be included in the calculation of the average
- `Agent.Stream` : Use the default [datastream][DataStream] assigned to the [agent][Agent]
- `TimeSpan.FromMinutes(15)`: Calculated the value based on the the following barsize (15 minute bars)
- `comp => (comp.High + comp.Low) / 2)`: When calculating this indicator, use the following calculation to manipulate the [bar][Bar] data. Here we will calculate the SMA based on the high price plus the low price divided by 2 for each [bar][Bar] we receive.

Each indicator contains the following properties:

- `IsReady :bool`: Is true when the indicator contains calculated values and is thus ready for use
- `Result :DataSerie`: The result of the calculations performed on the indicator. Some indicators use different naming, see the indicator sepcific docs if this is the case.

#### DataSerie
The DataSerie is a result object from an indicator that contains all result values calculated by it.

##### Properties
- `Count :int`: Amount of currently available result values
- `this[int index] :decimal`: Returns a result value for the index provided where 0 is the current result and 10 is 10 calculations back. Negative numbers are allowed as the absolute index is taken (-10 == 10).
- `CurrentValue :decimal`: The current and most recent result calculated by the indicator
- `MaxHistory :int`: In order to optimize speed performance, you can specify the maximum amount of historical results to store in the result object
- `IsFalling :bool`: Returns true if the current value of the serie is lower than its previous value
- `IsRising :bool`: Returns true if the current value of the serie is higher than its previous value

##### Functions
- `CrossedAbove(DataSerie B, int lookback = 3) :bool`: Looks if the result of the current object crossed above the result of the another object with a default lookback of 3 values.
- `CrossedUnder(DataSerie B, int lookback = 3) :bool`: Looks if the result of the current object crossed under the result of another object with a default lookback of 3 values.
- `CrossedAbove(decimal[] SeriesB, int lookback = 3) :bool`: Looks if the result of the current object crossed above the result of the another array with values with a default lookback of 3 values.
- `CrossedUnder(decimal[] SeriesB, int lookback = 3) :bool`: Looks if the result of the current object crossed under the result of the another array with values with a default lookback of 3 values.
- `Min(int lookback) :decimal`: Returns the minimum value for a given lookback period
- `Max(int lookback) :decimal`: Returns the maximum value for a given lookback period
- `Avg(int lookback) :decimal`: Returns the average value for a given lookback period
- `Sum(int lookback) :decimal`: Returns the sum of all values for a given lookback period

*(Note: `lookback` can be a positive as well as a negative number, -3 yields the same result as 3)*

#### MovingAverageType
The following MovingAverageTypes are available for use:

- `Simple`
- `Exponential`
- `Weighted`
- `DoubleExponential`
- `TripleExponential`
- `Triangular`
- `KaufmanAdaptive`
- `MESAAdaptive`
- `TillionT3`

#### Aroon
Constructors:
```c#
Aroon(int period, DataStream stream)
```
```c#
Aroon(int period, TimeSpan BarSize, DataStream stream)
```
```c#
Aroon(int period, TimeSpan BarSize, DataStream stream, Func<Bar, decimal> computeLow, Func<Bar, decimal> computeHigh)
```
Result:
```c#
DataSerie Up
```

```c#
DataSerie Down
```

#### Aroon Oscillator
Constructors:
```c#
AroonOscillator(int period, DataStream stream)
```
```c#
AroonOscillator(int period, TimeSpan BarSize, DataStream stream)
```
```c#
AroonOscillator(int period, TimeSpan BarSize, DataStream stream, Func<Bar, decimal> computeLow, Func<Bar, decimal> computeHigh)
```
Result:
```c#
DataSerie Result
```

#### Average Directional Index

Constructors:
```c#
AverageDirectionalIndex(int period, DataStream stream)
```
```c#
AverageDirectionalIndex(int period, DataStream stream, TimeSpan BarSize)
```
Result:
```c#
DataSerie Result
```

#### Average True Range

Constructors:
```c#
AverageTrueRange(int period, DataStream stream)
```
```c#
AverageTrueRange(int period, TimeSpan BarSize, DataStream stream)
```
Result:
```c#
DataSerie Result
```

#### Balance Of Power

Constructors:
```c#
BalanceOfPower(DataStream stream)
```
```c#
BalanceOfPower(DataStream stream, TimeSpan BarSize)
```
Result:
```c#
DataSerie Result
```

#### Bollinger Bands

Constructors:
```c#
BollingerBands(int period, double sdUp, double sdDown, DataStream stream)
```
```c#
BollingerBands(int period, double sdUp, double sdDown, DataStream stream, TimeSpan BarSize)
```
```c#
BollingerBands(int period, double sdUp, double sdDown, DataStream stream, TimeSpan BarSize, MovingAverageType MAType)
```
```c#
BollingerBands(int period, double sdUp, double sdDown, DataStream stream, TimeSpan BarSize, MovingAverageType MAType, Func<Bar, decimal> Compute)
```
Result:
```c#
DataSerie Upper
```
```c#
DataSerie Middle
```
```c#
DataSerie Lower
```

#### Chande Momentum Oscillator

Constructors:
```c#
ChandeMomentumOscillator(int period, DataStream stream)
```
```c#
ChandeMomentumOscillator(int period, TimeSpan BarSize, DataStream stream, Func<Bar, decimal> comp = null)
```
Result:
```c#
DataSerie Result
```

#### Commodity Channel Index

Constructors:
```c#
CommodityChannelIndex(int period, DataStream stream)
```
```c#
CommodityChannelIndex(int period, TimeSpan BarSize, DataStream stream)
```
Result:
```c#
DataSerie Result
```

#### Exponential Moving Average

Constructors:
```c#
ExponentialMovingAverage(int period, DataStream stream)
```
```c#
ExponentialMovingAverage(int period, TimeSpan BarSize, DataStream stream,  Func<Bar, decimal> comp = null)
```
Result:
```c#
DataSerie Result
```

#### Momentum

Constructors:
```c#
Momentum(int period, DataStream stream)
```
```c#
Momentum(int period, TimeSpan BarSize, DataStream stream, Func<Bar, decimal> comp = null)
```
Result:
```c#
DataSerie Result
```

#### Moving Average

Constructors:
```c#
MovingAverage(int period, MovingAverageType MAType, DataStream stream)
```
```c#
MovingAverage(int period, TimeSpan BarSize, MovingAverageType MAType, DataStream stream, Func<Bar, decimal> comp = null)
```
Result:
```c#
DataSerie Result
```

#### Moving Average Convergence Divergence

Constructors:
```c#
MovingAverageConDiv(int FastPeriod, int SlowPeriod, int SignalPeriod, DataStream stream)
```
```c#
MovingAverageConDiv(int FastPeriod, int SlowPeriod, int SignalPeriod, TimeSpan BarSize, DataStream stream, Func<Bar, decimal> comp = null)
```
Result:
```c#
DataSerie Histogram
```
```c#
DataSerie Line
```
```c#
DataSerie Signal
```
#### Parabolic SAR

Constructors:
```c#
ParabolicSAR(int period, double Accelerator, double Maximum, DataStream stream)
```
```c#
ParabolicSAR(int period, double Accelerator, double Maximum, DataStream stream, TimeSpan BarSize)
```
Result:
```c#
DataSerie Result
```

#### Rate Of Change

Constructors:
```c#
RateOfChange(int period, DataStream stream)
```
```c#
RateOfChange(int period, TimeSpan BarSize, DataStream stream, Func<Bar, decimal> comp = null)
```
Result:
```c#
DataSerie Result
```
#### Relative Strength Index

Constructors:
```c#
RelativeStrengthIndex(int period, DataStream stream)
```
```c#
RelativeStrengthIndex(int period, DataStream stream, TimeSpan BarSize, Func<Bar, decimal> comp = null)
```
Result:
```c#
DataSerie Result
```
#### Simple Moving Average

Constructors:
```c#
SimpleMovingAverage(int period, DataStream stream)
```
```c#
SimpleMovingAverage(int period, TimeSpan BarSize, DataStream stream,  Func<Bar, decimal> comp = null)
```
Result:
```c#
DataSerie Result
```
#### True Range

Constructors:
```c#
TrueRange(DataStream stream)
```
```c#
TrueRange(DataStream stream, TimeSpan BarSize)
```
Result:
```c#
DataSerie Result
```
#### Weighted Moving Average

Constructors:
```c#
WeightedMovingAverage(int period, DataStream stream)
```
```c#
WeightedMovingAverage(int period, TimeSpan BarSize, DataStream stream, Func<Bar, decimal> comp = null)
```
Result:
```c#
DataSerie Result
```
#### WilliamsR

Constructors:
```c#
WilliamsR(int period, DataStream stream)
```
```c#
WilliamsR(int period, DataStream stream, TimeSpan BarSize)
```
Result:
```c#
DataSerie Result
```

### Results
Automatically updates the following performance statistics of the portfolio on each position change (filled order). The following properties are available, via the following calls:


```c#
//Agent based results
Agent.Results;

//Portfolio based results
Portfolio.Results;
```

- `AvgLoser`: Average amount lost for each losing trade
- `AvgPerTrade`: Average amount of PnL for each trade
- `AvgWin`: Average amount gained for each winning trade
- `Balance`: Current balance on the account
- `BuyLosers`: Amount of trades closed negatively for buy trades
- `BuyPL`: Total PnL for buy trades
- `BuyWins`: Amount of trades closed positively for buy trades
- `Commissions`: Total amount of commissions paid
- `ComPerUnit`: Commisions per unit traded
- `ConsecLose`: Amount of consecutive loses for the longest streak
- `ConsecWin`: Amount of consecutive wins for a winning streak
- `DaysTraded`: Total amount of days having a trade
- `Flats`: Amount of trades that resulted flat
- `GrossPerDay`: Gross amount earned per day
- `GrossPL`: Total gross amount earned
- `InitialCapital`: Initial capital for this results object
- `Losers`: Number of trades closed in a loss
- `MaxDDPortfolio`: Maximum amount of drawdown based on the initial capital
- `MaxLoss`: Biggest losing trade made
- `MaxOpenLoss`: Maximum open loss
- `MaxOpenWin`: Maximum open win
- `MaxPL`: Maximum PnL acheived
- `MaxWin`: Biggest winning trade made
- `MinPL`: Minimum PnL acheived
- `MoneyInUse`: Total money in use (money used for trading)
- `NetPL`: Netto profit and loss (including commissions)
- `ProfitFactor`: Current profit factor based on current results
- `ROI`: Total return of investment in percentage (0.10 == 10%)
- `SellLosers`: Number of short trades that turned into a loss
- `SellPL`: Total PnL for short trades
- `SellWins`: Number of short trades that turned into a gain
- `SharpeRatio`: Current sharpe ratio
- `SortinoRatio`: Current sortino ratio
- `SymbolCount`: Amount of different symbols traded
- `Trades`: Number of trades made
- `Winners`: Number of trades that resulted in a gain of capital

[Developing & Backtesting Systematic Trading Strategies]: https://r-forge.r-project.org/scm/viewvc.php/*checkout*/pkg/quantstrat/sandbox/backtest_musings/strat_dev_process.pdf?root=blotter
[Contact Support]: mailto:support@quantler.com
[separation of concerns]: http://www.wikiwand.com/en/Separation_of_concerns
[Auto Discovery Service]: #quantler-the-quantler-model-auto-discovery-service
[DataStream]: #quantler-api-documentation-datastreams
[Data Sources]: #quantler-getting-started-data-sources
[Bar]: #bar
[Tick]: #tick
[Agent]: #agent
[Simple Moving Average]: #simple-moving-average
[Barlist]: #barlist
[Security]: #quantler-api-documentation-isecurity
[Account]: #quantler-api-documentation-account
[Positions]: #quantler-api-documentation-position
[Template]: #quantler-the-quantler-model-template
[Indicators]: #quantler-api-documentation-indicators
[Portfolio]: #quantler-api-documentation-portfolio
[Event]: #quantler-api-documentation-events
[Associated Agents]: #agent
[current performance]: #quantler-api-documentation-results
[Let us know]: mailto:feedback@quantler.com
[TA-Lib]: http://ta-lib.org/
[Charts]: #charts
[Results]: #results