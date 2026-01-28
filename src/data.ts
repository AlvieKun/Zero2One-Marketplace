export type Stock = {
  id: number
  ticker: string
  company: string
  price: string
  change: number
  market?: string
}

export type Sector = {
  id: number
  name: string
  stocks: Stock[]
}

const mk = (id: number, t: string, c: string, p: number, ch: number, m = 'NASDAQ') => ({ id, ticker: t, company: c, price: `$${p.toFixed(2)}`, change: ch, market: m })

export const sectors: Sector[] = [
  {
    id: 0,
    name: 'Technology',
    stocks: [
      mk(0, 'AAPL', 'Apple Inc.', 174.55, 1.24),
      mk(1, 'MSFT', 'Microsoft Corp.', 386.12, -0.42),
      mk(2, 'NVDA', 'NVIDIA Corp.', 980.12, 0.67),
      mk(3, 'GOOGL', 'Alphabet Inc.', 132.04, 0.88),
      mk(4, 'META', 'Meta Platforms', 315.44, 1.05),
      mk(5, 'TSLA', 'Tesla, Inc.', 245.33, 2.18),
      mk(6, 'ADBE', 'Adobe Inc.', 589.12, -0.22),
      mk(7, 'CRM', 'Salesforce', 223.55, 0.12),
      mk(8, 'ORCL', 'Oracle Corp.', 88.42, -0.57)
    ]
  },
  {
    id: 1,
    name: 'Healthcare',
    stocks: [
      mk(0, 'PFE', 'Pfizer Inc.', 37.22, 0.44, 'NYSE'),
      mk(1, 'JNJ', 'Johnson & Johnson', 162.12, -0.18, 'NYSE'),
      mk(2, 'MRK', 'Merck & Co.', 105.44, 0.33),
      mk(3, 'UNH', 'UnitedHealth', 515.32, -0.77),
      mk(4, 'ABBV', 'AbbVie', 169.88, 0.56),
      mk(5, 'AMGN', 'Amgen Inc.', 236.12, -0.45),
      mk(6, 'GILD', 'Gilead Sciences', 74.21, 0.12),
      mk(7, 'BMY', 'Bristol Myers', 67.33, -0.09),
      mk(8, 'LLY', 'Eli Lilly', 862.44, 1.12)
    ]
  },
  {
    id: 2,
    name: 'Financials',
    stocks: [
      mk(0, 'JPM', 'JPMorgan Chase', 148.22, 0.21),
      mk(1, 'BAC', 'Bank of America', 31.44, -0.34),
      mk(2, 'WFC', 'Wells Fargo', 48.12, 0.11),
      mk(3, 'C', 'Citigroup', 54.88, -0.62),
      mk(4, 'GS', 'Goldman Sachs', 362.12, 0.98),
      mk(5, 'MS', 'Morgan Stanley', 101.55, -0.08),
      mk(6, 'AXP', 'American Express', 180.44, 0.44),
      mk(7, 'BLK', 'BlackRock', 724.12, 0.65),
      mk(8, 'PNC', 'PNC Financial', 124.32, -0.12)
    ]
  },
  {
    id: 3,
    name: 'Consumer',
    stocks: [
      mk(0, 'AMZN', 'Amazon.com, Inc.', 146.20, -1.12),
      mk(1, 'WMT', 'Walmart Inc.', 154.33, 0.18),
      mk(2, 'NKE', 'Nike, Inc.', 102.12, 0.22),
      mk(3, 'SBUX', 'Starbucks Corp.', 90.44, -0.07),
      mk(4, 'MCD', "McDonald's Corp.", 286.12, 0.42),
      mk(5, 'TGT', 'Target Corp.', 150.88, -0.25),
      mk(6, 'HD', 'Home Depot', 359.44, 0.67),
      mk(7, 'LOW', 'Lowe’s Companies', 217.12, -0.11),
      mk(8, 'SYY', 'Sysco Corp.', 75.33, 0.02)
    ]
  },
  {
    id: 4,
    name: 'Energy',
    stocks: [
      mk(0, 'XOM', 'Exxon Mobil', 115.22, 0.34),
      mk(1, 'CVX', 'Chevron Corp.', 177.88, -0.11),
      mk(2, 'COP', 'ConocoPhillips', 117.44, 0.55),
      mk(3, 'SLB', 'Schlumberger', 26.12, -0.22),
      mk(4, 'OXY', 'Occidental', 57.33, 1.12),
      mk(5, 'PSX', 'Phillips 66', 99.44, -0.03),
      mk(6, 'KMI', 'Kinder Morgan', 23.12, 0.08),
      mk(7, 'MPC', 'Marathon Petroleum', 78.88, -0.19),
      mk(8, 'VLO', 'Valero Energy', 118.55, 0.44)
    ]
  }
]

export default sectors
