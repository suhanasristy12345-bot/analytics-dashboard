import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  ShoppingCart,
  Users,
  Settings,
  Search,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import './App.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
)


const monthlySales = [
  { month: 'Jan', revenue: 12000, orders: 780, customers: 520 },
  { month: 'Feb', revenue: 18000, orders: 850, customers: 570 },
  { month: 'Mar', revenue: 15000, orders: 810, customers: 590 },
  { month: 'Apr', revenue: 24000, orders: 920, customers: 650 },
  { month: 'May', revenue: 21000, orders: 880, customers: 700 },
  { month: 'Jun', revenue: 30000, orders: 1100, customers: 790 },
  { month: 'Jul', revenue: 27000, orders: 1248, customers: 864 },
]

const previousMonthlySales = [
  { revenue: 10000, orders: 700, customers: 480 },
  { revenue: 14000, orders: 760, customers: 510 },
  { revenue: 13000, orders: 740, customers: 530 },
  { revenue: 19000, orders: 820, customers: 570 },
  { revenue: 18000, orders: 800, customers: 620 },
  { revenue: 24000, orders: 950, customers: 700 },
  { revenue: 24000, orders: 1000, customers: 820 },
]


const monthlyCategorySales = [
  { month: 'Jan', Electronics: 420, Clothing: 310, Home: 250, Books: 180 },
  { month: 'Feb', Electronics: 450, Clothing: 330, Home: 270, Books: 190 },
  { month: 'Mar', Electronics: 430, Clothing: 320, Home: 260, Books: 200 },
  { month: 'Apr', Electronics: 480, Clothing: 350, Home: 290, Books: 210 },
  { month: 'May', Electronics: 500, Clothing: 370, Home: 300, Books: 220 },
  { month: 'Jun', Electronics: 540, Clothing: 390, Home: 320, Books: 240 },
  { month: 'Jul', Electronics: 580, Clothing: 420, Home: 340, Books: 260 },
]

function App() {
  const [period, setPeriod] = useState('7 months')
  const [recommendationIndex, setRecommendationIndex] = useState(0)

const [darkMode, setDarkMode] = useState(false)


const [searchTerm, setSearchTerm] = useState('')
console.log('Search term:', searchTerm)
const [categoryFilter, setCategoryFilter] = useState('All')
const [statusFilter, setStatusFilter] = useState('All')

  
const visibleMonths =
  period === '30 days'
    ? monthlySales.slice(-1)
    : period === '90 days'
      ? monthlySales.slice(-3)
      : monthlySales

const totalRevenue = visibleMonths.reduce(
  (sum, item) => sum + item.revenue,
  0
)

const totalOrders = visibleMonths.reduce(
  (sum, item) => sum + item.orders,
  0
)

const totalCustomers = visibleMonths[visibleMonths.length - 1].customers


const previousVisibleMonths = previousMonthlySales.slice(
  -visibleMonths.length
)

const previousRevenue = previousVisibleMonths.reduce(
  (sum, item) => sum + item.revenue,
  0
)

const previousOrders = previousVisibleMonths.reduce(
  (sum, item) => sum + item.orders,
  0
)

const previousCustomers =
  previousVisibleMonths[previousVisibleMonths.length - 1].customers

const calculateGrowth = (current, previous) =>
  previous === 0
    ? 0
    : ((current - previous) / previous) * 100

const revenueGrowth = calculateGrowth(totalRevenue, previousRevenue)
const ordersGrowth = calculateGrowth(totalOrders, previousOrders)
const customersGrowth = calculateGrowth(totalCustomers, previousCustomers)

const formatGrowth = (growth) =>
  `${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`

const bestRevenueMonth = visibleMonths.reduce(
  (best, month) =>
    month.revenue > best.revenue ? month : best,
  visibleMonths[0]
)

const averageMonthlyRevenue = Math.round(
  totalRevenue / visibleMonths.length
)

const formatRupees = (amount) =>
  `₹${amount.toLocaleString('en-IN')}`


 
const lineData = {
  labels: visibleMonths.map((item) => item.month),
  datasets: [{
    label: 'Revenue',
    data: visibleMonths.map((item) => item.revenue),
    borderColor: '#174b38',
    backgroundColor: 'rgba(120, 137, 91, 0.16)',
    pointBackgroundColor: '#174b38',
    pointBorderColor: '#fbf9f1',
    pointBorderWidth: 2,
    pointRadius: 4,
    fill: true,
    tension: 0.35,
    borderWidth: 2,
  }],
}


 
const visibleCategorySales = monthlyCategorySales.filter(
  (month) => visibleMonths.some(
    (salesMonth) => salesMonth.month === month.month
  )
)

const categoryNames = ['Electronics', 'Clothing', 'Home', 'Books']

const barData = {
  labels: categoryNames,
  datasets: [{
    label: 'Sales',
    data: categoryNames.map((category) =>
      visibleCategorySales.reduce(
        (sum, month) => sum + month[category],
        0
      )
    ),
    backgroundColor: ['#174b38', '#60794c', '#899765', '#b5b88b'],
    borderRadius: 6,
  }],
}


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  }

  const transactions = [
    { name: 'Wireless Headphones', category: 'Electronics', date: 'Oct 18, 2026', amount: 2499, status: 'Completed' },
    { name: 'Cotton T-Shirt', category: 'Clothing', date: 'Oct 17, 2026', amount: 899, status: 'Completed' },
    { name: 'Desk Lamp', category: 'Home', date: 'Oct 16, 2026', amount: 1299, status: 'Pending' },
    { name: 'Programming Book', category: 'Books', date: 'Oct 15, 2026', amount: 599, status: 'Completed' },
  ]

const totalTransactionAmount = transactions.reduce(
  (sum, item) => sum + item.amount,
  0
)

const pendingOrders = transactions.filter(
  (item) => item.status === 'Pending'
).length

const categoryTotals = transactions.reduce((totals, item) => {
  totals[item.category] = (totals[item.category] || 0) + item.amount
  return totals
}, {})

const topCategory = Object.entries(categoryTotals).sort(
  (a, b) => b[1] - a[1]
)[0]

const businessRecommendations = [
  {
    title: 'Top-performing category',
    message: `${topCategory[0]} has the highest transaction value in your current sample, at ${formatRupees(topCategory[1])}.`,
    action: 'Review this category to identify products worth promoting.',
  },
  {
    title: 'Pending orders',
    message: pendingOrders > 0
      ? `${pendingOrders} transaction${pendingOrders === 1 ? '' : 's'} ${pendingOrders === 1 ? 'is' : 'are'} still pending.`
      : 'There are no pending transactions in the current sample.',
    action: pendingOrders > 0
      ? 'Review pending transactions and update their status when appropriate.'
      : 'Keep monitoring new transactions.',
  },
 
  {
    title: 'Transaction overview',
    message: `The ${transactions.length} listed transactions have a combined value of ${formatRupees(totalTransactionAmount)}.`,
    action: 'Export the transaction data for further analysis.',
  },
  {
    title: 'Sales performance',
    message: `${bestRevenueMonth.month} is the strongest revenue month in the selected period, generating ${formatRupees(bestRevenueMonth.revenue)}. Average monthly revenue is ${formatRupees(averageMonthlyRevenue)}.`,
    action: 'Compare the strongest month with other months to identify patterns and plan future sales campaigns.',
  },
]




const filteredTransactions = transactions.filter((item) => {
  const matchesSearch = item.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase())

  const matchesCategory =
    categoryFilter === 'All' ||
    item.category === categoryFilter

  const matchesStatus =
    statusFilter === 'All' ||
    item.status === statusFilter

  return matchesSearch && matchesCategory && matchesStatus
})

const exportToCSV = () => {
  const headers = ['Product', 'Category', 'Date', 'Amount', 'Status']

  const rows = filteredTransactions.map((item) => [
    item.name,
    item.category,
    item.date,
    item.amount,
    item.status,
  ])

  const csvContent = [headers, ...rows]
    .map((row) =>
      row.map((value) =>
        `"${String(value).replace(/"/g, '""')}"`
      ).join(',')
    )
    .join('\r\n')

  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'analytics-transactions.csv'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}


  return (

<div className={`app-shell ${darkMode ? 'dark-mode' : ''}`}>

      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">A</span> Analytica</div>
        <p className="nav-label">WORKSPACE</p>
        <nav>
          <a className="nav-item active" href="#dashboard"><LayoutDashboard size={19}/> Dashboard</a>
          <a className="nav-item" href="#analytics"><ChartNoAxesCombined size={19}/> Analytics</a>
          <a className="nav-item" href="#transactions"><ShoppingCart size={19}/> Transactions</a>
          <a className="nav-item" href="#customers"><Users size={19}/> Customers</a>
        </nav>
        <div className="sidebar-bottom">
          <a className="nav-item" href="#settings"><Settings size={19}/> Settings</a>
          <div className="profile">
            <div className="avatar">S</div>
            <div><strong>Admin User</strong><small>Administrator</small></div>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
        
<div className="search-box">
  <Search size={18} />
  <input
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>


<div className="topbar-actions">
  <button
    className="icon-button theme-toggle"
    onClick={() => setDarkMode((current) => !current)}
    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {darkMode ? '☀️' : '🌙'}
  </button>

  <button className="icon-button" aria-label="Notifications">
    <Bell size={19} />
  </button>
</div>

        </header>

        <section className="page-heading">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h1>Business Dashboard</h1>
            <p className="muted">Here's what's happening with your business today.</p>
          </div>
          <select value={period} onChange={e => setPeriod(e.target.value)}>
            <option>7 months</option>
            <option>30 days</option>
            <option>90 days</option>
          </select>
        </section>

        <section className="kpi-grid">
          <article className="kpi-card">
            <div className="kpi-top"><span>Total Revenue</span><span className="kpi-icon purple"><ChartNoAxesCombined size={20}/></span></div>
            <h2>{formatRupees(totalRevenue)}</h2>
          

 
<p className={`trend ${revenueGrowth >= 0 ? 'up' : 'down'}`}>
  {revenueGrowth >= 0
    ? <ArrowUpRight size={16} />
    : <ArrowDownRight size={16} />}
  {formatGrowth(revenueGrowth)}
  <span>vs previous period</span>
</p>


          </article>
          <article className="kpi-card">
            <div className="kpi-top"><span>Total Orders</span><span className="kpi-icon blue"><ShoppingCart size={20}/></span></div>
            <h2>{totalOrders.toLocaleString('en-IN')}</h2>

<p className={`trend ${ordersGrowth >= 0 ? 'up' : 'down'}`}>
  {ordersGrowth >= 0
    ? <ArrowUpRight size={16} />
    : <ArrowDownRight size={16} />}
  {formatGrowth(ordersGrowth)}
  <span>vs previous period</span>
</p>

          </article>
          <article className="kpi-card">
            <div className="kpi-top"><span>Customers</span><span className="kpi-icon green"><Users size={20}/></span></div>
            <h2>{totalCustomers.toLocaleString('en-IN')}</h2>

<p className={`trend ${customersGrowth >= 0 ? 'up' : 'down'}`}>
  {customersGrowth >= 0
    ? <ArrowUpRight size={16} />
    : <ArrowDownRight size={16} />}
  {formatGrowth(customersGrowth)}
  <span>vs previous period</span>
</p>

          </article>
          <article className="kpi-card">
            <div className="kpi-top"><span>Refunds</span><span className="kpi-icon orange"><ShoppingCart size={20}/></span></div>
            <h2>₹4,850</h2>
            <p className="trend down"><ArrowDownRight size={16}/> 2.1% <span>vs last period</span></p>
          </article>
        </section>

        <section className="charts-grid" id="analytics">
          <article className="panel revenue-panel">
            <div className="panel-heading"><div><h3>Revenue Overview</h3><p className="muted">Monthly revenue performance</p></div><span className="legend-dot"> Revenue</span></div>
            <div className="chart-area"><Line data={lineData} options={chartOptions}/></div>
          </article>
          <article className="panel">
            <div className="panel-heading"><div><h3>Sales by Category</h3><p className="muted">Product performance</p></div></div>
            <div className="chart-area"><Bar data={barData} options={chartOptions}/></div>
          </article>
        </section>
        <section className="panel insights-panel">
  <div className="panel-heading">
    <div>
      <h3>Business Insights</h3>
      <p className="muted">Automatically generated from your data</p>
    </div>
  </div>

  <div className="insights-grid">
    <div className="insight-card">
      <p className="insight-label">Top Category</p>
      <h2>{topCategory[0]}</h2>
      <span>₹{topCategory[1].toLocaleString('en-IN')}</span>
    </div>

    <div className="insight-card">
      <p className="insight-label">Best Revenue Month</p>
      <h2>{bestRevenueMonth.month}</h2>
      <span>{formatRupees(bestRevenueMonth.revenue)} revenue</span>
    </div>

    <div className="insight-card">
      <p className="insight-label">Average Monthly Revenue</p>
      <h2>{formatRupees(averageMonthlyRevenue)}</h2>
      <span>Average for selected period</span>
    </div>


    <div className="insight-card">
      <p className="insight-label">Transaction Value</p>
      <h2>₹{totalTransactionAmount.toLocaleString('en-IN')}</h2>
      <span>Total across transactions</span>
    </div>

    <div className="insight-card">
      <p className="insight-label">Pending Orders</p>
      <h2>{pendingOrders}</h2>
      <span>Needs attention</span>
    </div>
  </div>

  
<div className="ai-insight">
  <div className="insight-action-heading">
    <strong>💡 Smart Business Recommendations</strong>
    <button
      className="view-button"
      onClick={() =>
        setRecommendationIndex(
          (current) =>
            (current + 1) % businessRecommendations.length
        )
      }
    >
      Next insight →
    </button>
  </div>

  <h4>{businessRecommendations[recommendationIndex].title}</h4>

  <p>{businessRecommendations[recommendationIndex].message}</p>

  <p>
    <strong>Recommended action:</strong>{' '}
    {businessRecommendations[recommendationIndex].action}
  </p>

  <span className="insight-counter">
    Insight {recommendationIndex + 1} of {businessRecommendations.length}
  </span>
</div>

</section>

        <section className="panel transactions-panel" id="transactions">
          <div className="panel-heading"><div><h3>Recent Transactions</h3><p className="muted">A summary of your latest orders</p></div><button className="view-button" onClick={exportToCSV}>
  Export CSV ↓
</button></div>
          
<div className="transaction-filters">
  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    aria-label="Filter by category"
  >
    <option value="All">All categories</option>
    <option value="Electronics">Electronics</option>
    <option value="Clothing">Clothing</option>
    <option value="Home">Home</option>
    <option value="Books">Books</option>
  </select>

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    aria-label="Filter by order status"
  >
    <option value="All">All statuses</option>
    <option value="Completed">Completed</option>
    <option value="Pending">Pending</option>
  </select>

  <button
    className="view-button"
    onClick={() => {
      setSearchTerm('')
      setCategoryFilter('All')
      setStatusFilter('All')
    }}
  >
    Clear filters
  </button>
</div>

          <div className="table-wrap">
            <table>
              <thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th></tr></thead>
              
<tbody>
  {filteredTransactions.length === 0 ? (
    <tr>
      <td colSpan={5} className="empty-results">
        No transactions match your filters.
      </td>
    </tr>
  ) : (
    filteredTransactions.map((item) => (
      <tr key={item.name}>
        <td className="product-name">{item.name}</td>
        <td>{item.category}</td>
        <td>{item.date}</td>
        <td>₹{item.amount.toLocaleString('en-IN')}</td>
        <td>
          <span className={`status ${item.status.toLowerCase()}`}>
            {item.status}
          </span>
        </td>
      </tr>
    ))
  )}
</tbody>

            </table>
          </div>
        </section>
        <footer>© 2026 Analytica · Business Intelligence Dashboard</footer>
      </main>
    </div>
  )
}

export default App