.PHONY: start-database start-testsDatabase
start-database:
	@docker-compose up -d postgres

start-testsDatabase:
	@docker-compose up -d testPostgres

destroy:
	@docker-compose down -v --rmi local
