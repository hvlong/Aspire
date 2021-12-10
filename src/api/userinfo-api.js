

export function getUserCardDetails() {
    const url = "https://bc6efa5e-56e8-48eb-a6ce-ceea56d12c21.mock.pstmn.io/v1/users/1/carinfo";
      return  fetch(url)
      .then(res => res.json())
      .then(json => {
          return json.data
        })
}


export function getExpenseHistoryFromAPI ()  {
  const url = "https://035ec0f0-ac61-48d4-9729-bbe609508e92.mock.pstmn.io/v1/users/1/expenseinfo?mon=last_six";
  return  fetch(url)
      .then(res => res.json())
      .then(json =>{
          return json.expense_info 
      })
          
    }


export function getExpenseCategoryFromAPI ()  {
  const url = "https://035ec0f0-ac61-48d4-9729-bbe609508e92.mock.pstmn.io/v1/users/1/categoryinfo?mon=last_six";
  return  fetch(url)
      .then(res => res.json())
      .then(json => {
        return json.categories_info
          
    })
  }

    //   dispatch({
    //     type: 'FETCH_CATEGORYINFO_SUCCESS',
    //     payload: { categoryInfo: json.categories_info }
    // })
      // .catch(error => {
      //     dispatch({
      //         type: 'FETCH_EXPENSE_FAILED',
      //     })
      //     Alert.alert('Error', 'unable to fetch category info')
      // })



