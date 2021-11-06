import axios from "axios";
import Pagination from "components/Pagination";
import React from "react";
import { SalePage } from "types/sale";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/requests";

const DataTable = () => {
	const [activePage, setActivePage] = React.useState(0);
	const [page, setPage] = React.useState<SalePage>({
		first: true,
		last: true,
		number: 0,
		totalElements: 0,
		totalPages: 0
	})

	React.useEffect(() => {
		axios.get(`${BASE_URL}/sales?page=${activePage}&size=5&sort=date,desc`)
			.then(res => {
				const data = res.data as SalePage;
				setPage(data);
			});
	}, [activePage])

	function changePage(index: number) {
		setActivePage(index);
	}

	return (
		<>
			<Pagination page={page} onPageChange={changePage} />
			<div className="table-responsive">
				<table className="table table-striped table-sm">
					<thead>
						<tr>
							<th>Data</th>
							<th>Vendedor</th>
							<th>Clientes visitados</th>
							<th>Negócios fechados</th>
							<th>Valor</th>
						</tr>
					</thead>
					<tbody>

						{page.content?.map(item => (
							<tr key={item.id}>
								<td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
								<td>{item.seller.name}</td>
								<td>{item.visited}</td>
								<td>{item.deals}</td>
								<td>{item.amount.toFixed(2)}</td>
							</tr>))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default DataTable;