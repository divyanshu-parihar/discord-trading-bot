import robin_stocks as rs
import requests
from uuid import uuid4
# {'access_token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkY3QiOjE3MTI5NDU4MDcsImRldmljZV9oYXNoIjoiZTU2NzMzNmEzNjc1ZmNkZGE1ZTA0MGJiOTg1M2NjY2IiLCJleHAiOjE3MTM0NjEzOTMsImxldmVsMl9hY2Nlc3MiOmZhbHNlLCJtZXRhIjp7Im9pZCI6ImM4MlNIMFdaT3NhYk9YR1Ayc3hxY2ozNEZ4a3ZmbldSWkJLbEJqRlMiLCJvbiI6IlJvYmluaG9vZCJ9LCJvcHRpb25zIjp0cnVlLCJzY29wZSI6ImludGVybmFsIiwic2VydmljZV9yZWNvcmRzIjpbeyJoYWx0ZWQiOmZhbHNlLCJzZXJ2aWNlIjoibnVtbXVzX3VzIiwic2hhcmRfaWQiOjEsInN0YXRlIjoiYXZ
# haWxhYmxlIn0seyJoYWx0ZWQiOmZhbHNlLCJzZXJ2aWNlIjoiYnJva2ViYWNrX
# 3VzIiwic2hhcmRfaWQiOjQsInN0YXRlIjoiYXZhaWxhYmxlIn1dLCJzcm0iOnsiYiI6eyJo
# bCI6ZmFsc2UsInIiOiJ1cyIsInNpZCI6NH0sIm4iOnsiaGwiOmZhbHNlLCJyIjoidXMiLCJzaWQiOjF9fSwidG9rZW4iOiJINmxVamNPTjlSVVVGMU9GbTNJeXlLRTRGV3I3cnkiLCJ1c2VyX2lkIjoiOTA0Zjg3YTAtZWJlYy00Mjk2LWEyMDctMjI5N2MzM2ExMzZiIiwidXNlcl9vcmlnaW4iOiJVUyJ9.efcBj9mL2UQ3tAzC3f9ujxM93_a3Po9qR6iBdCBeBje2qApJ-8Op8m_7XrYYgm87SdzPl73sPPoHJKvW5CkWWcyC5n2TG8Que0Ozn-7eH11ob0wVbgz5e28woFxvdFPWoNk6MvBM6l7178sIJFe5Ev9Wd2vAmkL8IuAB0yaZFTh-rw-LsuLA1gT2EPadfkf4tTYTqCV-EqDnDqijxz0UVl4VA0yD6RJXljhaF9Ll4N2ggyxUpZeQyx2oW7adott2u2FpEHFypmgQ2VhMOvsoYEOv4VnUMFp52AeuKc0sE3vx_sigPxIu_z7PBugnfn9o3GGfVW0i5sukJsi4
# ItygHQ', 'expires_in': 515399, 'token_type': 'Bearer', 'scope': 'internal', 'refresh_token': 'q4fBAM4ZJ1siT79iOoOS8Pkcd0NXGh', 'mfa_code': None, 'backup_code': None, 'detail': 'logged in with brand new authentication code.'}

def main():
    try: 
        login = rs.login(username='info@sean.ovh',
         password="Div.vvy123",
         expiresIn=86400,
         store_session=True,
         by_sms=False)

        my_stocks = rs.build_holdings()
        for key,value in my_stocks.items():
            print(key,value)
        print(login)
        rs.orders.order_buy_limit('AAPL',
                          5,
                          0.01,
                          timeInForce='gtc',
                          extendedHours=False)
    except Exception as e:
        print(e) 




def place_orders():
    headers = {"Authorization": f"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkY3QiOjE3MTI5NDQzMjIsImRldmljZV9oYXNoIjoiMzYwMWI2NjliMTBjZTI1YTUyNTYyZjYyODk4N2ZjYmMiLCJleHAiOjE3MTU2MTI3MDAsImxldmVsMl9hY2Nlc3MiOmZhbHNlLCJtZXRhIjp7Im9pZCI6ImM4MlNIMFdaT3NhYk9YR1Ayc3hxY2ozNEZ4a3ZmbldSWkJLbEJqRlMiLCJvbiI6IlJvYmluaG9vZCJ9LCJvcHRpb25zIjp0cnVlLCJwb3MiOiJwIiwic2NvcGUiOiJpbnRlcm5hbCIsInNlcnZpY2VfcmVjb3JkcyI6W3siaGFsdGVkIjpmYWxzZSwic2VydmljZSI6Im51bW11c191cyIsInNoYXJkX2lkIjoxLCJzdGF0ZSI6ImF2YWlsYWJsZSJ9LHsiaGFsdGVkIjpmYWxzZSwic2VydmljZSI6ImJyb2tlYmFja191cyIsInNoYXJkX2lkIjo0LCJzdGF0ZSI6ImF2YWlsYWJsZSJ9XSwic3JtIjp7ImIiOnsiaGwiOmZhbHNlLCJyIjoidXMiLCJzaWQiOjR9LCJuIjp7ImhsIjpmYWxzZSwiciI6InVzIiwic2lkIjoxfX0sInRva2VuIjoiR1p0N3M0NncxY3dwR01Dd3Z3Y2l4Ulg5UUtEZFRvIiwidXNlcl9pZCI6IjkwNGY4N2EwLWViZWMtNDI5Ni1hMjA3LTIyOTdjMzNhMTM2YiIsInVzZXJfb3JpZ2luIjoiVVMifQ.YiDQHkU9HGsgjlzA3QyKHwzQYYTvs0Qjh28N2hRn5jlyvAIUw8M-lftgzxfI5jccFxxTHq1QJZY1G7g1BXcFEZ43CtZqrSiqV678OE25lDorC8RGysu0Lie7YxZGUarsPhcxFCIiK7H9_P8mkJW38tpEQZ1_3sLT36K5iK0HphtREwWn1JJhadfl24jxY2gLkIe2k8tjxG0ji2aUEeXSHKDxOKgpof98O0DB3ebr_ZAFLZuMCzsLjhQnu38AoWNtqVrSzz9yi0CC-GNBocYi2_A5SGo60nZmCcIycZH3Ne9EoYDjKuwQF5TBzXvw3pd2Mm7er3yZ9n8obrrO7OW44Q"} 
    order_payload = {
    "account": "https://api.robinhood.com/accounts/799908983/",
    "instrument": "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
    "quantity": 1,
    "price": "0.01",
    "side": "buy",
    "type": "limit",
    "time_in_force":"gfd",
    "trigger": "immediate",
    "symbol" : "AAPL"
    }
    order_url = "https://api.robinhood.com/orders/"
    response = requests.post(order_url, json=order_payload, headers=headers)
    print(response.text)


# def place_orders_options():
#     headers = {
#     "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkY3QiOjE3MTI5NDQzMjIsImRldmljZV9oYXNoIjoiMzYwMWI2NjliMTBjZTI1YTUyNTYyZjYyODk4N2ZjYmMiLCJleHAiOjE3MTU2MTI3MDAsImxldmVsMl9hY2Nlc3MiOmZhbHNlLCJtZXRhIjp7Im9pZCI6ImM4MlNIMFdaT3NhYk9YR1Ayc3hxY2ozNEZ4a3ZmbldSWkJLbEJqRlMiLCJvbiI6IlJvYmluaG9vZCJ9LCJvcHRpb25zIjp0cnVlLCJwb3MiOiJwIiwic2NvcGUiOiJpbnRlcm5hbCIsInNlcnZpY2VfcmVjb3JkcyI6W3siaGFsdGVkIjpmYWxzZSwic2VydmljZSI6Im51bW11c191cyIsInNoYXJkX2lkIjoxLCJzdGF0ZSI6ImF2YWlsYWJsZSJ9LHsiaGFsdGVkIjpmYWxzZSwic2VydmljZSI6ImJyb2tlYmFja191cyIsInNoYXJkX2lkIjo0LCJzdGF0ZSI6ImF2YWlsYWJsZSJ9XSwic3JtIjp7ImIiOnsiaGwiOmZhbHNlLCJyIjoidXMiLCJzaWQiOjR9LCJuIjp7ImhsIjpmYWxzZSwiciI6InVzIiwic2lkIjoxfX0sInRva2VuIjoiR1p0N3M0NncxY3dwR01Dd3Z3Y2l4Ulg5UUtEZFRvIiwidXNlcl9pZCI6IjkwNGY4N2EwLWViZWMtNDI5Ni1hMjA3LTIyOTdjMzNhMTM2YiIsInVzZXJfb3JpZ2luIjoiVVMifQ.YiDQHkU9HGsgjlzA3QyKHwzQYYTvs0Qjh28N2hRn5jlyvAIUw8M-lftgzxfI5jccFxxTHq1QJZY1G7g1BXcFEZ43CtZqrSiqV678OE25lDorC8RGysu0Lie7YxZGUarsPhcxFCIiK7H9_P8mkJW38tpEQZ1_3sLT36K5iK0HphtREwWn1JJhadfl24jxY2gLkIe2k8tjxG0ji2aUEeXSHKDxOKgpof98O0DB3ebr_ZAFLZuMCzsLjhQnu38AoWNtqVrSzz9yi0CC-GNBocYi2_A5SGo60nZmCcIycZH3Ne9EoYDjKuwQF5TBzXvw3pd2Mm7er3yZ9n8obrrO7OW44Q"
#     }

#     order_payload = {
#         "account": "https://api.robinhood.com/accounts/799908983/",
#         "instrument": "https://api.robinhood.com/instruments/816c30f3-f2bb-4a26-84cd-395b3f13dbd0",
#         "quantity": 1,
#         "price": "0.01",
#         "side": "buy",
#         "type": "limit",
#         "time_in_force": "gfd",
#         "trigger": "immediate",
#         "symbol": "AAPL",
#         "direction": "debit",
#         "legs":[{"option":"https://api.robinhood.com/options/instruments/6b63cacd-b5ba-4af5-841b-684bdb60e9bd/","position_effect":"open","ratio_quantity":1,"side":"buy"}]
#     }

    # order_payload = {
    #     "account": "https://api.robinhood.com/accounts/799908983/",
    #     "instrument": "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
    #     "quantity": 1,
    #     "price": "0.01",
    #     # "side": "buy",
    #     "type": "limit",
    #     "time_in_force": "gfd",
    #     "trigger": "immediate",
    #     "symbol": "AAPL",
    #     "expirationDate":"2024-05-09",
    #     "strike":"300.00",
    #     "optionType":"call",
    #     "effect":"open",
    #     "action":"sell",
    #     "direction": "debit",  # Adjust this according to the valid choices for direction
    #     # "legs": [           # Ensure that legs is provided as a list
    #         # {
    #         #     # Add leg details if necessary
    #         # }
    #     # ] 
    # }

    # order_url = "https://api.robinhood.com/options/orders"

    # response = requests.post(order_url, json=order_payload, headers=headers)

    # print(response.text)

def order_buy_option_limit(optionType='both', account_number=None, timeInForce='gtc', jsonify=True):
    """Submits a limit order for an option. i.e. place a long call or a long put.

    :param positionEffect: Either 'open' for a buy to open effect or 'close' for a buy to close effect.
    :type positionEffect: str
    :param creditOrDebit: Either 'debit' or 'credit'.
    :type creditOrDebit: str
    :param price: The limit price to trigger a buy of the option.
    :type price: float
    :param symbol: The stock ticker of the stock to trade.
    :type symbol: str
    :param quantity: The number of options to buy.
    :type quantity: int
    :param expirationDate: The expiration date of the option in 'YYYY-MM-DD' format.
    :type expirationDate: str
    :param strike: The strike price of the option.
    :type strike: float
    :param optionType: This should be 'call' or 'put'
    :type optionType: str
    :param account_number: the robinhood account number.
    :type account_number: Optional[str]
    :param timeInForce: Changes how long the order will be in effect for. 'gtc' = good until cancelled. \
    'gfd' = good for the day. 'ioc' = immediate or cancel. 'opg' execute at opening.
    :type timeInForce: Optional[str]
    :param jsonify: If set to False, function will return the request object which contains status code and headers.
    :type jsonify: Optional[str]
    :returns: Dictionary that contains information regarding the buying of options, \
    such as the order id, the state of order (queued, confired, filled, failed, canceled, etc.), \
    the price, and the quantity.

    """ 
    # try:
    #     symbol = symbol.upper().strip()
    # except AttributeError as message:
    #     print(message, file=get_output())
    #     return None

    # optionID = id_for_option(symbol, expirationDate, strike, optionType)

    payload = {
        "account": "https://api.robinhood.com/accounts/799908983/",
        # "instrument": "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
        "quantity": 1,
        "price": "0.01",
        # "side": "buy",
        "type": "limit",
        "time_in_force": "gfd",
        "trigger": "immediate",
        "symbol": "AAPL",
        "expirationDate":"2024-04-19",
        "strike":"300.00",
        "optionType":"call",
        "effect":"open",
        "action":"buy",
        "direction": "debit",  # Adjust this according to the valid choices for direction
         'legs': [
            {'position_effect': 'open', 'side': 'buy',
                'ratio_quantity': 1, 'option': "https://api.robinhood.com/options/instruments/6b63cacd-b5ba-4af5-841b-684bdb60e9bd/"},
        ],
    }
    headers = {
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkY3QiOjE3MTI5NDQzMjIsImRldmljZV9oYXNoIjoiMzYwMWI2NjliMTBjZTI1YTUyNTYyZjYyODk4N2ZjYmMiLCJleHAiOjE3MTU2MTI3MDAsImxldmVsMl9hY2Nlc3MiOmZhbHNlLCJtZXRhIjp7Im9pZCI6ImM4MlNIMFdaT3NhYk9YR1Ayc3hxY2ozNEZ4a3ZmbldSWkJLbEJqRlMiLCJvbiI6IlJvYmluaG9vZCJ9LCJvcHRpb25zIjp0cnVlLCJwb3MiOiJwIiwic2NvcGUiOiJpbnRlcm5hbCIsInNlcnZpY2VfcmVjb3JkcyI6W3siaGFsdGVkIjpmYWxzZSwic2VydmljZSI6Im51bW11c191cyIsInNoYXJkX2lkIjoxLCJzdGF0ZSI6ImF2YWlsYWJsZSJ9LHsiaGFsdGVkIjpmYWxzZSwic2VydmljZSI6ImJyb2tlYmFja191cyIsInNoYXJkX2lkIjo0LCJzdGF0ZSI6ImF2YWlsYWJsZSJ9XSwic3JtIjp7ImIiOnsiaGwiOmZhbHNlLCJyIjoidXMiLCJzaWQiOjR9LCJuIjp7ImhsIjpmYWxzZSwiciI6InVzIiwic2lkIjoxfX0sInRva2VuIjoiR1p0N3M0NncxY3dwR01Dd3Z3Y2l4Ulg5UUtEZFRvIiwidXNlcl9pZCI6IjkwNGY4N2EwLWViZWMtNDI5Ni1hMjA3LTIyOTdjMzNhMTM2YiIsInVzZXJfb3JpZ2luIjoiVVMifQ.YiDQHkU9HGsgjlzA3QyKHwzQYYTvs0Qjh28N2hRn5jlyvAIUw8M-lftgzxfI5jccFxxTHq1QJZY1G7g1BXcFEZ43CtZqrSiqV678OE25lDorC8RGysu0Lie7YxZGUarsPhcxFCIiK7H9_P8mkJW38tpEQZ1_3sLT36K5iK0HphtREwWn1JJhadfl24jxY2gLkIe2k8tjxG0ji2aUEeXSHKDxOKgpof98O0DB3ebr_ZAFLZuMCzsLjhQnu38AoWNtqVrSzz9yi0CC-GNBocYi2_A5SGo60nZmCcIycZH3Ne9EoYDjKuwQF5TBzXvw3pd2Mm7er3yZ9n8obrrO7OW44Q"
    }
    # payload = {
    #     'account': "https://api.robinhood.com/accounts/799908983/",
    #     'direction': 'debit',
    #     'time_in_force': 'gfd',
    #     'legs': [
    #         {'position_effect': 'open', 'side': 'buy',
    #             'ratio_quantity': 1, 'option': "https://api.robinhood.com/options/instruments/6b63cacd-b5ba-4af5-841b-684bdb60e9bd/"},
    #     ],
    #     'type': 'limit',
    #     'trigger': 'immediate',
    #     'price': '0.01',
    #     'quantity': 1 ,
    #     'override_day_trade_checks': False,
    #     'override_dtbp_checks': False,
    #     'ref_id': str(uuid4()),
    # }
    # order_url = 

    response = requests.post("https://api.robinhood.com/options/orders", json=payload, headers=headers)

    print(response.text)
    # url =  
    # data = (url, payload, json=True, jsonify_data=jsonify)

if __name__ == '__main__':
    order_buy_option_limit()