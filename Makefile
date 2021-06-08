.PHONY: start-database
start-database:
	@docker-compose up -d postgres

destroy:
	@docker-compose down -v --rmi local
