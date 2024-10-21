interface WalletBalance {
  currency: string;
  amount: number;
}

/*
Refactored:
FormattedWalletBalance interface now extends the WalletBalance interface to avoid repeating attributes.
I used inheritance to include the existing properties (currency and amount) from WalletBalance,
while also adding a new property, formatted to FormattedWalletBalance. This allows FormattedWalletBalance 
to be a specialized version of WalletBalance with an extra field,
without duplicating the definition of the original properties.
*/
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

class Datasource {
  // TODO: Implement datasource class
  private url: string;

  public constructor(url: string){
    this.url = url;
  }

  public async getPrices(): Promise<{ [currency: string]: number }> {
    try {
      const response = await fetch(this.url);
      const data = await response.json();

      // Process the response to get the latest price for each currency
      // date is stored as well , so that it can be compared against to get the latest price for a particular currency
      const prices: { [currency: string]: { price: number; date: string } } = {};

      data.forEach((item: { currency: string; date: string; price: number }) => {
        const { currency, date, price } = item;

        // Update the price if it's the first occurrence or if the current date is newer
        if (!prices[currency] || new Date(date) > new Date(prices[currency].date)) {
          prices[currency] = { price, date };
        }
      });

      // Extract just the price values for the final output
      const latestPrices = Object.fromEntries(
        Object.entries(prices).map(([currency, { price }]) => [currency, price])
      );

      return latestPrices;
    } catch (error) {
      console.error("Failed to fetch prices:", error);
      throw error;
    }
  }
}

interface Props extends BoxProps {

}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState<{ [key: string]: number }>({}); // Added type for prices

  //Introduced loading and error state to manage the data fetching process 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    
    const fetchData = async () => {
      try {
        const prices = await datasource.getPrices();
        setPrices(prices);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Added Type safety, Blockchain is typed as "any". used a more specific type => "string"
	const getPriority = (blockchain: string): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  // renamed sortedBalances  to filteredAndSortedBalances as its not indicative of what it is doing
  const filteredAndSortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
                          
		  return (balancePriority > -99) && (balance.amount <= 0)  // should be using balancePriority instead of lhsPriority, and also simplified the nested "if" statements

		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances]);  // removed prices from the dependency as it is not used in the logic. leaving it in may lead to frequent recalculation when prices change


  //=========================== Refactor this block, to reduce the number of iteration over the array (inefficiency)===========================
  // Added a return type to FormattedWalletBalance, as we are adding the new attribute "formatted" ( added comment before refactoring the whole block )

  // const formattedBalances = filteredAndSortedBalances.map((balance: WalletBalance): FormattedWalletBalance => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed()
  //   }
  // })

  // // it should be formattedBalances.map instead ( added comment before refactoring the whole block )
  // const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
  //   const usdValue = prices[balance.currency] * balance.amount;
  //   return (
  //     <WalletRow 
  //       className={classes.row}
  //       key={index}
  //       amount={balance.amount}
  //       usdValue={usdValue}
  //       formattedAmount={balance.formatted}
  //     />
  //   )
  // })
  //=============================================================================================================================================
  
  //=========================Above block refactored to the following=============================================================================
  // Combine map operations to reduce iterations over the array
  const rows = filteredAndSortedBalances.map((balance: WalletBalance, index: number) => {
    const formatted = balance.amount.toFixed(); // Add formatted attribute directly here
    const usdValue = prices[balance.currency] * balance.amount;
    
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency + index} // Use currency + index to create a unique key
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formatted}
      />
    );
  });
  
  //=============================================================================================================================================


  // Manage loading state when fetching prices
  if (loading) {
    return <div>Loading...</div>; // To implement spinner
  }

  if (error) {
    return <div>Error: {error}</div>; // To Implement: Add "Alerts" if there are error
  }

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}